export default class StorageService {
    public oneHourMs: number = 3600000

    public getStorageItem(key: string): any {
        const itemInStorage = localStorage.getItem(key)
        if (itemInStorage) {
            const itemParsed = JSON.parse(itemInStorage)
            const now: Date = new Date()
            if (now.getTime() < itemParsed.expiry) {
                return itemParsed.value
            }
            this.removeStorageItems(key)
        }
        return null
    }

    public setStorageItem(key: string, value: any, expireTimeMs: number|null) {
        const expiry: number = expireTimeMs ?? this.oneHourMs
        localStorage.setItem(key, JSON.stringify({
            value,
            expiry: new Date().getTime() + expiry
        }))
    }

    public removeStorageItems(...keys: any) {
        keys.forEach((key: string) => {
            localStorage.removeItem(key)
        })
    }
}