import { useRouter } from 'expo-router';
import { useEffect } from 'react';
import { Redirect } from 'expo-router';
export default function Index() {
  return <Redirect href="/auth/login" />;
}