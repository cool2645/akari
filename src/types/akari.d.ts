import { Kokoro } from 'kokoro-player'

declare global {
  interface Window {
    akari: {
      version: string
      console: {
        akari?: string
        hoshiakari?: string
      }
      player: Kokoro
      nightMode: boolean
    }
  }
}
