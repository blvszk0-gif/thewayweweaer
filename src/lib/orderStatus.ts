export type OrderStageId = 'confirmed' | 'preparing' | 'sent' | 'delivered';

export const ORDER_STAGES: { id: OrderStageId; label: string }[] = [
  { id: 'confirmed', label: 'ZAMÓWIENIE POTWIERDZONE' },
  { id: 'preparing', label: 'PRZYGOTOWANIE ZAMÓWIENIA' },
  { id: 'sent', label: 'WYSYŁKA ZAMÓWIENIA' },
  { id: 'delivered', label: 'ODEBRANO' },
];

interface FulfillmentLike {
  latestShipmentStatus: string | null;
}

interface OrderLike {
  fulfillmentStatus?: string | null;
  fulfillments?: { nodes: FulfillmentLike[] } | null;
}

export function orderStageIndex(order: OrderLike): number {
  const fulfillments = order.fulfillments?.nodes ?? [];

  if (fulfillments.some((f) => f.latestShipmentStatus === 'DELIVERED')) {
    return 3;
  }

  const hasShipped =
    fulfillments.some((f) => !!f.latestShipmentStatus) ||
    order.fulfillmentStatus === 'FULFILLED' ||
    order.fulfillmentStatus === 'PARTIALLY_FULFILLED';
  if (hasShipped) return 2;

  if (
    order.fulfillmentStatus === 'IN_PROGRESS' ||
    order.fulfillmentStatus === 'SCHEDULED' ||
    order.fulfillmentStatus === 'ON_HOLD'
  ) {
    return 1;
  }

  return 0;
}

export function extractNumericId(gid: string): string {
  return gid.split('/').pop() ?? gid;
}
