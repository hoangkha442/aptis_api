import { Injectable } from '@nestjs/common';
import { google } from 'googleapis';
import * as fs from 'fs';

@Injectable()
export class GoogleDriveService {
  private oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    process.env.GOOGLE_REDIRECT_URI,
  );

  constructor() {
    this.loadTokens();
  }

  private loadTokens() {
    if (fs.existsSync('tokens.json')) {
      const tokens = JSON.parse(fs.readFileSync('tokens.json', 'utf-8'));
      this.oauth2Client.setCredentials(tokens);
    }
  }

  async saveTokens(tokens) {
    fs.writeFileSync('tokens.json', JSON.stringify(tokens));
    this.oauth2Client.setCredentials(tokens);
  }

  getAuthUrl() {
    return this.oauth2Client.generateAuthUrl({
      access_type: 'offline',
      scope: ['https://www.googleapis.com/auth/drive.readonly'],
      prompt: 'consent',
    });
  }

  async setCredentials(code: string) {
    const { tokens } = await this.oauth2Client.getToken(code);
    await this.saveTokens(tokens);
  }

  async getFilesInFolder(folderId: string) {
    const drive = google.drive({ version: 'v3', auth: this.oauth2Client });
    const res = await drive.files.list({
      q: `'${folderId}' in parents and trashed = false`,
      fields: 'files(id, name, mimeType)',
      supportsAllDrives: true,
      includeItemsFromAllDrives: true,
      corpora: 'allDrives',
    });
    return res.data.files;
  }

  async getDriveFileStream(fileId: string) {
    const drive = google.drive({ version: 'v3', auth: this.oauth2Client });
    const res = await drive.files.get(
      { fileId, alt: 'media', supportsAllDrives: true },
      { responseType: 'stream' }
    );
    return res.data;
  }
}


