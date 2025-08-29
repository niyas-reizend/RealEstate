"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleGetAllCommissionsByAgentId = void 0;
const agentCommission_service_1 = require("../services/agentCommission.service");
const handleGetAllCommissionsByAgentId = async (req, res) => {
    try {
        const agentId = req.user.id;
        const commissions = await (0, agentCommission_service_1.getAllCommissionsByAgentId)(agentId);
        res.json(commissions);
    }
    catch (err) {
        res.status(500).json({ error: " totally failed Failed to fetch commissions" });
    }
};
exports.handleGetAllCommissionsByAgentId = handleGetAllCommissionsByAgentId;
// export const handleGetCommissionById = async (req: Request, res: Response) => {
//   try {
//     const id = Number(req.params.id);
//     const commission = await getCommissionById(id);
//     res.json(commission);
//   } catch (err: any) {
//     res.status(404).json({ error: err.message });
//   }
// };
