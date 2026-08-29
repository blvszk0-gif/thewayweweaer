'use client';

import { Link } from '@/i18n/routing';
import { CANCELLED_LABEL, ORDER_STAGES, extractNumericId, isOrderCancelled, orderStageIndex } from '@/lib/orderStatus';

type Order = {
  id: string;
  number?: number;
  processedAt?: string;
  cancelledAt?: string | null;
  financialStatus?: string;
  fulfillmentStatus?: string;
  totalPrice?: {
    amount: string;
    currencyCode: string;
  };
  fulfillments?: {
    nodes: Array<{ latestShipmentStatus: string | null }>;
  };
};

type OrderHistoryProps = {
  orders: Order[];
};

export function OrderHistory({ orders }: OrderHistoryProps) {
  return (
    <section>
      <h2 className="text-2xl font-black uppercase italic mb-6">
        Historia zamówień
      </h2>

      {orders.length ? (
        <div className="space-y-4">
          {orders.map((order) => (
            <Link
              key={order.id}
              href={`/status/${extractNumericId(order.id)}`}
              className="block border border-[color:var(--border)] rounded-2xl p-6 flex flex-wrap justify-between gap-4 hover:bg-[color:var(--surface-muted)] transition-colors"
            >
              <div>
                <p className="font-black">
                  Zamówienie #{order.number ?? order.id}
                </p>

                <p className="opacity-50 text-sm">
                  {order.processedAt
                    ? new Date(order.processedAt).toLocaleDateString('pl-PL')
                    : ''}
                </p>
              </div>

              <div className="text-right">
                <p className="font-black">
                  {order.totalPrice
                    ? `${order.totalPrice.amount} ${order.totalPrice.currencyCode}`
                    : ''}
                </p>

                <p className={`text-sm ${isOrderCancelled(order) ? 'font-black text-red-500' : 'opacity-50'}`}>
                  {isOrderCancelled(order) ? CANCELLED_LABEL : ORDER_STAGES[orderStageIndex(order)].label}
                </p>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <p className="opacity-50">
          Nie masz jeszcze zamówień.
        </p>
      )}
    </section>
  );
}