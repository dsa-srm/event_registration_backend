import { Request, Response } from 'express';

//write your code here
// if you code exceeds the max length of 50 lines, then write your code in parts inside service and export them here.

export const addClubDetails = async (req:Request, res:Response) => {
   try {
    
      const {clubName} = req.body;
    
      if(clubName===undefined || clubName===null || clubName==="" || clubName===0){
        console.log(clubName)

        res.status(404).json({"message":"club name is required"});
        return;
      }
        res.send({"message":"club name is required"})

   } catch (error) {
      res.status(500).json({ error: 'Error fetching data.',errorMessage:error });
   }
}
export const getClubDetails = async (req:Request, res:Response) => {
    console.log("inside get")
    res.send('Hello, TypeScript Backend!');


}