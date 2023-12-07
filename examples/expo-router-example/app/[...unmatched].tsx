import { useRouter } from 'expo-router';
import { useEffect } from 'react';

export default function Unmatched() {
  const router = useRouter();
  useEffect(() => {
    setTimeout(() => {
      router.replace('/');
    }, 1);
  }, []);
  return null;
}
