import { HttpHeaders } from "@angular/common/http";
import { AccountService } from "../modules/account/service/account.service";
import { Injectable } from "@angular/core";
import { AccessLogin } from "../modules/account/entities/access-login";

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