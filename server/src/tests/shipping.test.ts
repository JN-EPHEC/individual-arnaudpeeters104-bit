import { calculateShipping } from '../utils/shipping';

describe('Shipping - N-Wise Testing (Optimisation à 6 cas)', () => {
  
  const nWiseCases = [
    // ID | Distance | Poids | Type | Résultat attendu
    [10, 5, 'standard', 10],    // ID 1: D1, W1, T1
    [10, 20, 'express', 30],   // ID 2: D1, W2, T2 (10 * 1.5 * 2)
    [100, 5, 'express', 50],   // ID 3: D2, W1, T2 (25 * 2)
    [100, 20, 'standard', 37.5], // ID 4: D2, W2, T1 (25 * 1.5)
    [600, 5, 'express', 100],  // ID 5: D3, W1, T2 (50 * 2)
    [600, 20, 'standard', 75], // ID 6: D3, W2, T1 (50 * 1.5)
  ];

  test.each(nWiseCases)(
    'N-Wise ID: Pour d=%ikm, w=%ikg, type=%s, le prix est %i€',
    (distance, weight, type, expected) => {
      const result = calculateShipping(distance as number, weight as number, type as any);
      expect(result).toBe(expected);
    }
  );
});

it("devrait couvrir les paliers de distance exacts (0km et 51km)", () => {
    // Couvre la ligne 51 (distance <= 50)
    expect(calculateShipping(0, 5, 'standard')).toBe(10);
    // Couvre la ligne 55 (distance <= 500)
    expect(calculateShipping(51, 5, 'standard')).toBe(25);
  });