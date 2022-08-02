import {instance} from "./api-config";

export const timeZoneAPI = {
    fetchTimeZones() {
        return instance.get<fetchTimeZoneResponseType>('')
    },
    getCurrentTime(timeZone: string) {
        return instance.get<getCurrentTimeResponseType>(`${timeZone}`)
    }
}

export type fetchTimeZoneResponseType = string[]
export type getCurrentTimeResponseType = {
    datetime: string
    timezone: string
}