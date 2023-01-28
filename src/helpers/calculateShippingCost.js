export function calculateShippingCost(distance) {
  const distanceInKilometers = distance.distancia / 1000;

  let shippingCost = 0;

  for (let i = 0; i < distanceInKilometers + 1; i++) {
    const factor = i > 5 ? 6.99 : 5.99;

    if (distanceInKilometers <= i) shippingCost = i + factor;
  }

  return parseFloat(shippingCost.toFixed(2));
}
