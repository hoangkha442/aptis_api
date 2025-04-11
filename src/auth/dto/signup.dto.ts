import { ApiProperty } from "@nestjs/swagger";

export class BodySignup {
    @ApiProperty({ description: 'abc@gmail.com' })
    email: string;

    @ApiProperty()
    password: string;

    @ApiProperty()
    full_name: string;

    @ApiProperty({ required: false })
    phone_number?: string;

    @ApiProperty({
        description: 'The role of the user, could be admin, instructor, or student',
        example: 'student',
        required: false,
    })
    role?: 'admin' | 'lecturer' | 'student'; 

    @ApiProperty({ required: false })
    last_day?: Date | string;
}
