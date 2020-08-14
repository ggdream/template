// cnpm i -S crypto-js jsencrypt node-rsa
// jsencrypt需要手动导出RSAKey

import NodeRSA from 'node-rsa'
import CryptoJS from 'crypto-js'
import {RSAKey, JSEncrypt} from 'jsencrypt'


class aes {
    constructor(iv) {
        this.iv = CryptoJS.enc.Utf8.parse(iv)
    }

    GenerateKey(bits) {
        let e, c = ""
        const b = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
        for (let d = 0; bits > d; d += 1)
            e = Math.random() * b.length,
            e = Math.floor(e),
            c += b.charAt(e)
        return c
    }

    Encrypt(data, key) {
        const text = CryptoJS.AES.encrypt(
            CryptoJS.enc.Utf8.parse(data),
            CryptoJS.enc.Utf8.parse(key),
            {
                iv: this.iv,
                mode: CryptoJS.mode.CBC,
                padding: CryptoJS.pad.Pkcs7
            }
        )
        return text.toString()
    }

    Decrypt(data, key) { 
        const text = CryptoJS.AES.decrypt(
            data,
            CryptoJS.enc.Utf8.parse(key),
            {
                iv: this.iv,
                mode: CryptoJS.mode.CBC,
                padding: CryptoJS.pad.Pkcs7
            }
        )
        return text.toString(CryptoJS.enc.Utf8).toString()
    }
}


class rsa {
    constructor(exp, mod, privateKey) {
        this.rsa = new RSAKey()
        this.rsas = new JSEncrypt()

        if (exp !== undefined && mod !== undefined) {
            this.setPublicKey(exp, mod)
        }

        if (privateKey !== undefined) {
            this.setPrivateKey(privateKey)
        }
    }

    setPublicKey(exp, mod) {
        this.rsa.setPublic(mod, exp)
    }

    setPrivateKey(privateKey) {
        this.rsas.setPrivateKey(privateKey)
    }

    GenerateKey(bits) {
        const key = new NodeRSA({b: bits})
        return {
            publicKey: key.exportKey("pkcs1-public-pem"),
            privateKey: key.exportKey("pkcs1-private-pem")
        }
    }

    Encrypt(data) {
        const hexStr = this.rsa.encrypt(data)
        return CryptoJS.enc.Base64.stringify(CryptoJS.enc.Hex.parse(hexStr))
    }

    Decrypt(data) {
        return this.rsas.decrypt(data)
    }
}


export {aes, rsa}