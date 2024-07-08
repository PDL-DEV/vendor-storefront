import { HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";

export class HttpUtils {
    static isSecureProtocol(): boolean {
        if (document.location.protocol == 'https:') {
            return true;
        }

        return false;
    }

    static getHostnameWithoutWWW(): string {
        let hostname = location.hostname;
        if (hostname.split('.')[0] == 'www') {
            hostname = `${location.hostname.replace(/^(?:https?:\/\/)?(?:www\.)?/i, '')}`;
        }

        return hostname;
    }
}