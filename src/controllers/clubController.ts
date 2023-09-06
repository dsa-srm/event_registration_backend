import express, { Request, Response } from 'express';

//write your code here
// if you code exceeds the max length of 50 lines, then write your code in parts inside service and export them here.

export const addClubDetails = async (req:Request, res:Response) => {
    console.log("inside post")

res.send('Hello, TypeScript Backend!');
}
export const getClubDetails = async (req:Request, res:Response) => {
    console.log("inside get")
    res.send('Hello, TypeScript Backend!');


}