import { BaseEntity } from './../../shared';

export const enum GW_SKU {
    'GW_PS_NET_ENG3_SR_ARCHITECT',
    'GW_PS_NET_ENG2_ARCHITECT',
    'GW_PS_NET_ENG1_ENGINEER',
    'GW_PS_STORAGE_ENG3_SR_ARCHITECT',
    'GW_PS_STORAGE_ENG2_ARCHITECT',
    'GW_PS_STORAGE_ENG1_ENGINEER',
    'GW_PS_VIRT_ENG3_SR_ARCHITECT',
    'GW_PS_VIRT_ENG2_ARCHITECT',
    'GW_PS_VIRT_ENG1_ENGINEER',
    'GW_PS_MS_ENG3_SR_ARCHITECT',
    'GW_PS_MS_ENG2_ARCHITECT',
    'GW_PS_MS_ENG1_ENGINEER',
    'GW_PS_SEC_ENG3_SR_ARCHITECT',
    'GW_PS_SEC_ENG2_ARCHITECT',
    'GW_PS_SEC_ENG1_ENGINEER',
    'GW_PS_CLD_ENG3_SR_ARCHITECT',
    'GW_PS_CLD_ENG2_ARCHITECT',
    'GW_PS_CLD_ENG1_ENGINEER',
    'GW_PS_INT_LEVEL3',
    'GW_PS_INT_LEVEL2',
    'GW_PS_INT_LEVEL1',
    'GW_PS_PM_LEVEL2_PROJECT_MANAGER',
    'GW_PS_PM_LEVEL1_PROJECT_MANAGER',
    'GW_PS_PC_PROJECT_COORDINATOR'
}

export class Task implements BaseEntity {
    constructor(
        public id?: number,
        public name?: string,
        public estimatedHours?: number,
        public resource?: GW_SKU,
        public cost?: number,
        public numberOfResources?: number,
        public subTotal?: number,
        public phase?: BaseEntity,
    ) {
    }
}
