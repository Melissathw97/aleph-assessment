import path from "path";
import { NextResponse } from "next/server";
import { readFile, writeFile } from "fs/promises";

const dataFilePath = path.join(process.cwd(), "/app/api/json/user-data.json");

type IUser = {
    name: string;
    email: string;
    age: number;
    phone_number: string;
    language: "en" | "ms";
};

export async function GET() {
    const jsonData = await readFile(dataFilePath);
    const objectData: IUser[] = JSON.parse(jsonData.toString())
        .map(({ name, email, age, phone_number, language } : IUser) => ({
            name,
            email,
            age,
            phoneNumber: phone_number,
            language
        }));

    return NextResponse.json(objectData);
}

export async function POST(request: Request) {
    const res = await request.json()

    try {
        // Read the existing data from the JSON file
        const jsonData = await readFile(dataFilePath);
        const objectData = JSON.parse(jsonData.toString());

        // Get the data from the request body
        const { name, email, age, phoneNumber, language } = res;

        // Add the new data to the object
        const newData = {
            name,
            email,
            age,
            phone_number: phoneNumber,
            language
        };

        objectData.push(newData);

        // Convert the object back to a JSON string
        const updatedData = JSON.stringify(objectData);

        // Write the updated data to the JSON file
        await writeFile(dataFilePath, updatedData);

        // Send a success response
        return NextResponse.json({ message: "Data stored successfully" });
    } catch (error) {
        // Send an error response
        return NextResponse.json({ message: "Error storing data" });
    }
}

// export async function PUT() {
//     return NextResponse.json({ message: "Hello - PUT" });
// }

// export async function DELETE() {
//     return NextResponse.json({ message: "Hello - DELETE" });
// }