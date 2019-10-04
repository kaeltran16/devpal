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
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const education_entity_1 = require("./education.entity");
const social_entity_1 = require("./social.entity");
let ProfileEntity = class ProfileEntity {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn('uuid'),
    __metadata("design:type", String)
], ProfileEntity.prototype, "id", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], ProfileEntity.prototype, "handle", void 0);
__decorate([
    typeorm_1.Column('simple-array'),
    __metadata("design:type", Array)
], ProfileEntity.prototype, "skills", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Boolean)
], ProfileEntity.prototype, "status", void 0);
__decorate([
    typeorm_1.Column({ default: '' }),
    __metadata("design:type", String)
], ProfileEntity.prototype, "bio", void 0);
__decorate([
    typeorm_1.Column({ default: '' }),
    __metadata("design:type", String)
], ProfileEntity.prototype, "website", void 0);
__decorate([
    typeorm_1.Column({ default: '' }),
    __metadata("design:type", String)
], ProfileEntity.prototype, "company", void 0);
__decorate([
    typeorm_1.Column({ default: '' }),
    __metadata("design:type", String)
], ProfileEntity.prototype, "githubUsername", void 0);
__decorate([
    typeorm_1.Column({ default: '' }),
    __metadata("design:type", String)
], ProfileEntity.prototype, "location", void 0);
__decorate([
    typeorm_1.OneToMany(type => education_entity_1.EducationEntity, education => education.profile, { eager: true }),
    typeorm_1.JoinColumn(),
    __metadata("design:type", Array)
], ProfileEntity.prototype, "educations", void 0);
__decorate([
    typeorm_1.OneToMany(type => education_entity_1.EducationEntity, education => education.profile, { eager: true }),
    typeorm_1.JoinColumn(),
    __metadata("design:type", Array)
], ProfileEntity.prototype, "experiences", void 0);
__decorate([
    typeorm_1.OneToOne(type => social_entity_1.SocialEntity, social => social.profile, { eager: true }),
    __metadata("design:type", social_entity_1.SocialEntity)
], ProfileEntity.prototype, "social", void 0);
ProfileEntity = __decorate([
    typeorm_1.Entity('profile')
], ProfileEntity);
exports.ProfileEntity = ProfileEntity;
//# sourceMappingURL=profile.entity.js.map