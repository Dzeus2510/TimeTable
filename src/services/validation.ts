import { ObjectId } from "mongodb";

export class Validation{
    public async invalidId(id: string): Promise<void> {
        if (!ObjectId.isValid(id)) {
            throw new Error("Please input valid ID")
        }
    }

    public async findItem(item: any): Promise<void> {
        if (item == null) {
            throw new Error("There are none " + item.constructor.name)
        }
        return item
    }

    public async checkInput(inputs : any[]): Promise<void> {
        for (let input of inputs) {
            if (!input) {
                throw new Error("Please input all fields")
            }
        }
    }

    
}

