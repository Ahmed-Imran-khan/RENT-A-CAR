import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { User, UserDocument } from './user.schema';

@Injectable()
export class AuthService {
    constructor(
        @InjectModel(User.name) private userModel: Model<UserDocument>,
        private jwtService: JwtService,
    ) { }

    async register(name: string, email: string, password: string) {
        const existing = await this.userModel.findOne({ email });
        if (existing) throw new ConflictException('Email already exists');

        const hashed = await bcrypt.hash(password, 10);
        const user = await this.userModel.create({ name, email, password: hashed });
        return { message: 'Registered successfully', userId: user._id };
    }

    async login(email: string, password: string) {
        const user = await this.userModel.findOne({ email });
        if (!user) throw new UnauthorizedException('Invalid credentials');

        const match = await bcrypt.compare(password, user.password);
        if (!match) throw new UnauthorizedException('Invalid credentials');

        const token = this.jwtService.sign({ id: user._id, role: user.role });
        return { token, name: user.name, role: user.role };
    }
}