import { http } from '@/api/http'

// Objets actuellement en conteneur (module conteneurs du backend upcycle).
// Remplace l'ancien mock "demandes de depot".
export interface DepositedPackage {
  package_id: string
  code: string
  object_id: string
  object_name: string
  category: string
  score: number
  locker_name: string
  locker_city: string
  expiry_date: string
}

export function fetchDepositedPackages(): Promise<DepositedPackage[]> {
  return http<DepositedPackage[]>('upcycle', '/packages/deposited')
}
