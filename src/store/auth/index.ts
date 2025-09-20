// store/auth.ts
import { atom } from 'jotai'

export type User = {
    username?: string
    avatar?: string
} | null

export const userAtom = atom<User>(null)
