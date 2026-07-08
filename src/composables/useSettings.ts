import { ref } from 'vue'

export type Locale = 'fr' | 'en'

export interface AccountInfo {
  name: string
  email: string
  currentPassword: string
  newPassword: string
}

const MOCK_ACCOUNT: AccountInfo = {
  name: 'Alice Martin',
  email: 'alice@upcycleconnect.fr',
  currentPassword: '',
  newPassword: '',
}

export function useSettings() {
  const locale = ref<Locale>((localStorage.getItem('locale') as Locale) ?? 'fr')
  const account = ref<AccountInfo>({ ...MOCK_ACCOUNT })

  function setLocale(lang: Locale) {
    locale.value = lang
    localStorage.setItem('locale', lang)
  }

  const accountSaveAvailable = false

  async function saveAccount() {

  }

  return { locale, account, setLocale, saveAccount, accountSaveAvailable }
}
