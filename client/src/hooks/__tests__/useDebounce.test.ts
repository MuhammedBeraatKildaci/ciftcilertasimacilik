import { renderHook, act } from '@testing-library/react-hooks';
import { useDebounce } from '../useDebounce';

describe('useDebounce', () => {
  jest.useFakeTimers();

  it('returns initial value immediately', () => {
    const { result } = renderHook(() => useDebounce('initial', 500));
    expect(result.current).toBe('initial');
  });

  it('debounces value changes', () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      { initialProps: { value: 'initial', delay: 500 } }
    );

    // İlk değer
    expect(result.current).toBe('initial');

    // Değeri güncelle
    rerender({ value: 'updated', delay: 500 });
    
    // Zamanlayıcı tetiklenmeden önce hala eski değer
    expect(result.current).toBe('initial');

    // Zamanlayıcıyı ilerlet
    act(() => {
      jest.advanceTimersByTime(500);
    });

    // Yeni değer
    expect(result.current).toBe('updated');
  });

  it('cleans up timeout on unmount', () => {
    const { unmount } = renderHook(() => useDebounce('test', 500));
    
    unmount();
    
    // clearTimeout çağrıldığını kontrol et
    expect(clearTimeout).toHaveBeenCalled();
  });
}); 