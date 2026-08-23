'use client';

type Order = {
  id: string;
  number?: string;
  processedAt?: string;
  financialStatus?: string;
  fulfillmentStatus?: string;
  totalPrice?: {
    amount: string;
    currencyCode: string;
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
            <article
              key={order.id}
              className="border border-[color:var(--border)] rounded-2xl p-6 flex flex-wrap justify-between gap-4"
            >
              <div>
                <p className="font-black">
                  Zamówienie #{order.number || order.id}
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

                <p className="opacity-50 text-sm">
                  {order.fulfillmentStatus ||
                    order.financialStatus ||
                    'W realizacji'}
                </p>
              </div>
            </article>
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