"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const crypto = require("crypto");
const user_entity_1 = require("./user.entity");
const typeorm_2 = require("typeorm");
const class_validator_1 = require("class-validator");
const jwt_1 = require("@nestjs/jwt");
let UserService = class UserService {
    constructor(userRepository, jwtService) {
        this.userRepository = userRepository;
        this.jwtService = jwtService;
    }
    async findAll() {
        return await this.userRepository.find();
    }
    async findOne(loginUserDto) {
        const findUserOption = {
            email: loginUserDto.email,
            password: crypto
                .createHmac('sha256', loginUserDto.password)
                .digest('hex'),
        };
        return await this.userRepository.findOne(findUserOption);
    }
    async create(dto) {
        const { username, email, password } = dto;
        const queryBuilder = this.userRepository
            .createQueryBuilder('user')
            .where('user.username = :username', { username })
            .orWhere('user.email = :email', { email });
        const user = await queryBuilder.getOne();
        if (user) {
            throw new common_1.BadRequestException('email and username must be unique');
        }
        let newUser = new user_entity_1.UserEntity();
        newUser.username = username;
        newUser.email = email;
        newUser.password = password;
        newUser.posts = [];
        const errors = await class_validator_1.validate(newUser);
        if (errors.length > 0) {
            throw new common_1.BadRequestException('user input is not valid');
        }
        const savedUser = await this.userRepository.save(newUser);
        return this.buildUserRO(savedUser);
    }
    async update(id, dto) {
        let toUpdate = await this.userRepository.findOne(id);
        delete toUpdate.password;
        delete toUpdate.likes;
        let updated = Object.assign(toUpdate, dto);
        await this.userRepository.save(updated);
        return this.buildUserRO(updated);
    }
    async delete(email) {
        return await this.userRepository.delete({ email });
    }
    async findById(id) {
        const user = await this.userRepository.findOne(id);
        if (!user)
            throw new common_1.NotFoundException('user not found');
        return user;
    }
    async findByEmail(email) {
        const user = await this.userRepository.findOne({ email });
        if (!user)
            throw new common_1.NotFoundException('user not found');
        return this.buildUserRO(user);
    }
    buildUserRO(user) {
        const { id, username, email, bio, avatar } = user;
        const payload = {
            id,
            username,
            email,
        };
        const token = this.jwtService.sign(payload);
        return {
            user: {
                username,
                email,
                bio,
                avatar,
                token,
            },
        };
    }
};
UserService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(user_entity_1.UserEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        jwt_1.JwtService])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map