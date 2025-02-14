class SaintService {
  constructor({ saintRepository }) {
    this.saintRepository = saintRepository
  }

  async getSaint(saintId) {
    if (saintId === undefined)
      throw new Error("Saint ID is missing");
    
    const saint = await this.saintRepository.getSaint(saintId)

    return saint[0]
  }

  async listSaintsBy(date, month) {
    if (!date || !month)
      throw new Error("Date and month are required");

    const listSaints = await this.saintRepository.listSaintsBy(date, month);

    return listSaints;      
  }
}

module.exports = SaintService