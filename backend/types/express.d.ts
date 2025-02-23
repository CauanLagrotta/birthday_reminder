import express from 'express';

declare global {
  namespace Express {
    export interface Request {
      user?: {
        id: string
        name: string
        email: string
        password: string
      }
    }
  }
}