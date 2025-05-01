"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkUserPremium = checkUserPremium;
// bot/handlers/subscriptionHandler.ts
const userSubscription_1 = require("../../db/userSubscription");
/**
 * İstifadəçinin premium abunəliyini yoxlayır.
 * Premium funksiyaya icazə varsa true, yoxsa false qaytarır.
 */
function checkUserPremium(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        const sub = yield (0, userSubscription_1.getUserSubscription)(userId);
        // Premium statusu və müddət yoxlanılır
        return !!sub && sub.isActive && (!sub.expiresAt || new Date(sub.expiresAt) > new Date());
    });
}
