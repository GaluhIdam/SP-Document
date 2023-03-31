export interface ViewDescriptionDocumentDTO {
    sender_nomor_pegawai: number;
    sender_unit: Text;
    sender_name: Text;
    sender_date: Date;
    receiver: Text;
    quantity: number;
    description: Text;
    remarks: Text;
}