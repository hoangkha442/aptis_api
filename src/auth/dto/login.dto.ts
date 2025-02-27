import { ApiProperty } from "@nestjs/swagger"

export class bodyLogin {
    @ApiProperty({
        example: 'string@gmail.com',
    })
    email: string

    @ApiProperty({
        example: '123',
    })
    password: string
}
