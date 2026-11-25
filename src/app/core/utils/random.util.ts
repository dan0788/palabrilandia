/**
 * Utilidades para aleatorización y barajado de retos pedagógicos
 */

/**
 * Baraja un arreglo de forma inmutable usando el algoritmo Fisher-Yates
 */
export function shuffleArray<T>(array: readonly T[]): T[] {
  const result = [...array];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

/**
 * Selecciona una muestra aleatoria de N elementos sin repetición
 */
export function sampleRandom<T>(array: readonly T[], count: number): T[] {
  const shuffled = shuffleArray(array);
  return shuffled.slice(0, Math.min(count, shuffled.length));
}
