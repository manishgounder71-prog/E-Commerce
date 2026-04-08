import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { createClient } from '@supabase/supabase-js';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || 'sk_test_placeholder', {
    apiVersion: '2025-02-24-preview',
});

const supabaseAdmin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co',
    process.env.SUPABASE_SERVICE_ROLE_KEY || 'placeholder_key' // Use service role for elevated access
);

export async function POST(request: Request) {
    const body = await request.text();
    const sig = request.headers.get('stripe-signature')!;

    let event: Stripe.Event;

    try {
        event = stripe.webhooks.constructEvent(
            body,
            sig,
            process.env.STRIPE_WEBHOOK_SECRET!
        );
    } catch (err: any) {
        return NextResponse.json({ error: `Webhook Error: ${err.message}` }, { status: 400 });
    }

    if (event.type === 'checkout.session.completed') {
        const session = event.data.object as Stripe.Checkout.Session;

        // Fulfill the order in Supabase
        const { data: order, error } = await supabaseAdmin
            .from('orders')
            .update({ 
                payment_status: 'paid', 
                status: 'processing',
                payment_intent_id: session.payment_intent as string
            })
            .eq('payment_intent_id', session.id) // Or use a unique order ref
            .select();

        if (error) {
            console.error('Error fulfilling order:', error);
            return NextResponse.json({ error: 'Fulfillment failed' }, { status: 500 });
        }

        console.log('Order fulfilled:', order);
    }

    return NextResponse.json({ received: true });
}
