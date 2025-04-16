import { Injectable } from '@angular/core';
import { getUrl } from 'aws-amplify/storage';

export class Utils {

  static getParameterByName(name: string, url: string = '') {
    if (!url) {
      url = window.location.href;
    }
    name = name.replace(/[\[\]]/g, '\\$&');
    const regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)');
    const results = regex.exec(url);
    if (!results) {
      return null;
    }
    if (!results[2]) {
      return '';
    }
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
  }

  static getExtension(filename: string) {
    const parts = filename.split('.');
    return parts[parts.length - 1];
  }

  static isImage(filename: string) {
    const ext = this.getExtension(filename);
    switch (ext.toLowerCase()) {
      case 'jpg':
      case 'gif':
      case 'bmp':
      case 'png':
        return true;
    }
    return false;
  }

  static  isAudio(filename: string) {
    const ext = this.getExtension(filename);
    switch (ext.toLowerCase()) {
      case 'mp3':
      case 'wav':
      case 'wma':
        return true;
    }
    return false;
  }

  static isVideo(filename: string) {
    const ext = this.getExtension(filename);
    switch (ext.toLowerCase()) {
      case 'm4v':
      case 'avi':
      case 'mpg':
      case 'mp4':
      case 'mov':
        // etc
        return true;
    }
    return false;
  }

  static isValidEmail(email: string) {
    return EmailRegx.test(email);
  }

  static async getLink(path: string) {
    const { url: { href } } = await getUrl({ path });
    return href;
  }

}

export const StrongPasswordRegx: RegExp =
  /^(?=[^A-Z]*[A-Z])(?=[^a-z]*[a-z])(?=\D*\d).{8,}$/;

export const EmailRegx: RegExp =
  /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
