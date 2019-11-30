from application.database import db,redisdb
from application.database.model import CommonModel
from sqlalchemy import (and_, or_, String,SmallInteger, Integer, BigInteger, Boolean, DECIMAL, Float, Text, ForeignKey, UniqueConstraint, Index, DateTime)
from sqlalchemy.dialects.postgresql import UUID, JSONB

from sqlalchemy.orm import relationship, backref
import uuid

def default_uuid():
    return str(uuid.uuid4())

roles_users = db.Table('roles_users',
                       db.Column('user_id', UUID(as_uuid=True), db.ForeignKey('user.id', ondelete='cascade'), primary_key=True),
                       db.Column('role_id', UUID(as_uuid=True), db.ForeignKey('role.id', onupdate='cascade'), primary_key=True))


class Role(CommonModel):
    __tablename__ = 'role'
    id = db.Column(UUID(as_uuid=True), primary_key=True, default=default_uuid)
    ma = db.Column(db.String(80), unique=True)
    name = db.Column(db.String(80), unique=True)
    description = db.Column(db.String(255))

class User(CommonModel):
    __tablename__ = 'user'
    id = db.Column(UUID(as_uuid=True), primary_key=True, default=default_uuid)
    phone_number =  db.Column(String(50), index=True, nullable=True)
    email =  db.Column(String(50), index=True, nullable=True)
    name = db.Column(String(50))
    password = db.Column(String, nullable=True)
    salt = db.Column(db.String())
    type = db.Column(db.String())
    active = db.Column(db.Boolean(), default=True)
    roles = db.relationship('Role', secondary=roles_users, cascade="save-update")
    vaitro = db.Column(db.String())

    def has_role(self, role):
        if isinstance(role, str):
            return role in (role.ma for role in self.roles)
        else:
            return role in self.roles


class DonVi(CommonModel):
    __tablename__ = 'donvi'
    id = db.Column(UUID(as_uuid=True), primary_key=True, default=default_uuid)
    ten = db.Column(db.String(255))
    email = db.Column(db.String(255))
    Website = db.Column(db.String(255))
    Fax = db.Column(db.String(255))
    sodienthoai = db.Column(db.String(63))
    diachi = db.Column(db.String(255))
    tinhthanh_id = db.Column(String, nullable=True)
    tinhthanh = db.Column(JSONB)
    quanhuyen_id = db.Column(String, nullable=True)
    quanhuyen = db.Column(JSONB)
    xaphuong_id = db.Column(String, nullable=True)
    xaphuong = db.Column(JSONB)
    giamdoc = db.Column(db.String)

    

class DanToc(CommonModel):
    __tablename__ = 'dantoc'
    id = db.Column(UUID(as_uuid=True), primary_key=True, default=default_uuid)
    ma = db.Column(String(255), index=True)
    ten = db.Column(String(255))
    
class QuocGia(CommonModel):
    __tablename__ = 'quocgia'
    id = db.Column(UUID(as_uuid=True), primary_key=True, default=default_uuid)
    ma = db.Column(String(255), index=True)
    ten = db.Column(String(255))

class TinhThanh(CommonModel):
    __tablename__ = 'tinhthanh'
    id = db.Column(UUID(as_uuid=True), primary_key=True, default=default_uuid)
    ma = db.Column(String(255),unique=True, index=True)
    ten = db.Column(String(255))
    quocgia_id = db.Column(UUID(as_uuid=True), nullable=True)
    quocgia = db.Column(JSONB)

class QuanHuyen(CommonModel):
    __tablename__ = 'quanhuyen'
    id = db.Column(UUID(as_uuid=True), primary_key=True, default=default_uuid)
    ma = db.Column(String(255),unique=True, index=True)
    ten = db.Column(String(255))
    tinhthanh_id = db.Column(UUID(as_uuid=True), nullable=True)
    tinhthanh = db.Column(JSONB)
    
class XaPhuong(CommonModel):
    __tablename__ = 'xaphuong'
    id = db.Column(UUID(as_uuid=True), primary_key=True, default=default_uuid)
    ma = db.Column(String(255),unique=True, index=True)
    ten = db.Column(String(255))
    quanhuyen_id = db.Column(UUID(as_uuid=True), nullable=True)
    quanhuyen = db.Column(JSONB)


    
class ThietBi(CommonModel):
    __tablename__ = 'thietbi'
    id = db.Column(UUID(as_uuid=True), primary_key=True, default=default_uuid)
    ten = db.Column(String(255))
    phanloai = db.Column(String(255))
    donvithuchienphanloai = db.Column(String(255))
    soluuhanh = db.Column(String(255))
    donviyeucauphanloai = db.Column(String(255))
    tinhtrang = db.Column(String(255))
    bangphanloai = db.Column(String(255))
    congkhaiphanloai = db.Column(String(255))
    chitietsanphamfield = db.relationship('ChiTietThietBi', cascade="all, delete-orphan")

class ChiTietThietBi(CommonModel):
    __tablename__ = 'chitietthietbi'
    id = db.Column(UUID(as_uuid=True), primary_key=True, default=default_uuid)
    tenthietbi = db.Column(String(255))
    model_serial_number = db.Column(String(255))
    ma_qltb = db.Column(String(255))
    noisanxuat = db.Column(String(255))
    ngaymua = db.Column(BigInteger())
    nhacungcap_id = db.Column(UUID(as_uuid=True),db.ForeignKey('donvi.id'), nullable=True)
    nhacungcap = db.relationship('DonVi', viewonly=True)
    baohanhtungay = db.Column(BigInteger())
    baohanhdenngay = db.Column(BigInteger())
    hetbaohanh = db.Column(String(255))
    thongsokythuat = db.Column(Text())
    phukien = db.Column(Text())
    tinhtrangthietbikhimua = db.Column(String(255))
    yeucauvebaoduong = db.Column(Text())
    noidungbaoduong = db.Column(Text())
    luuykhisudung = db.Column(Text())
    ngaynhap = db.Column(BigInteger())
    thietbi_id = db.Column(UUID(as_uuid=True), ForeignKey('thietbi.id'), nullable=True)
    phieuyeucausuachuafield = db.relationship('PhieuYeuCauSuaChua', cascade="all, delete-orphan")
    bangkiemtrathietbifield = db.relationship('BangKiemTraThietBi', cascade="all, delete-orphan")
    bienbanxacnhantinhtrangthietbifield = db.relationship('BienBanXacNhanTinhTrangThietBi', cascade="all, delete-orphan")


class BangKiemTraThietBi(CommonModel):
    __tablename__ = 'bangkiemtrathietbi'
    id = db.Column(UUID(as_uuid=True), primary_key=True, default=default_uuid)
    ngay = db.Column(BigInteger())
    tinhtrang = db.Column(String(255))
    mota = db.Column(String(255))
    nguoikiemtra_id = db.Column(String(255))
    nguoikiemtra = db.Column(String(255))
    tenthietbi = db.Column(String(255))
    chitietthietbi_id = db.Column(UUID(as_uuid=True), ForeignKey('chitietthietbi.id'), nullable=True)

class BienBanXacNhanTinhTrangThietBi(CommonModel):
    __tablename__ = 'bienbanxacnhantinhtrangthietbi'
    id = db.Column(UUID(as_uuid=True), primary_key=True, default=default_uuid)
    tentrangthietbi = db.Column(String(255))
    tai  = db.Column(String(255))
    nha = db.Column(String(255))
    nguoisudung = db.Column(String(255))
    donvi = db.Column(String(255))
    ketquakiemtra = db.Column(Text())
    huongkhacphuc = db.Column(Text())
    ngay = db.Column(BigInteger())
    chuky = db.Column(String(10))
    chitietthietbi_id = db.Column(UUID(as_uuid=True), ForeignKey('chitietthietbi.id'), nullable=True)



class PhieuYeuCauSuaChua(CommonModel):
    __tablename__ = 'phieuyeucausuachua'
    id = db.Column(UUID(as_uuid=True), primary_key=True, default=default_uuid)
    tenthietbi = db.Column(String(255))
    ma_qltb = db.Column(String(255))
    nguoisudung = db.Column(String(255))
    donvisudung = db.Column(String(255))
    motasuco = db.Column(Text())
    ngay_suco = db.Column(BigInteger())
    xacnhan_nguoisudungbaosuco = db.Column(String(255))
    xacnhan_donvi = db.Column(String(255))
    danhgiasobo = db.Column(Text())
    ngay_danhgia = db.Column(BigInteger())
    xacnhan_canbosuachua = db.Column(String(255))
    ykienlanhdao = db.Column(String(255))
    ketqua = db.Column(Text())
    ngay_ketqua = db.Column(BigInteger())
    xacnhan_nguoisudungnhanketqua = db.Column(String(255))
    chitietthietbi_id = db.Column(UUID(as_uuid=True), ForeignKey('chitietthietbi.id'), nullable=True)


class KeHoachHangNgay(CommonModel):
    __tablename__ = 'kehoachhangngay'
    id = db.Column(UUID(as_uuid=True), primary_key=True, default=default_uuid)
    dsthietbi = db.Column(JSONB)
    ngay = db.Column(BigInteger())
    

class BangKeHoachKiemTraThietBiTheoNam(CommonModel):
    __tablename__ = 'bangkehoachkiemtrathietbitheonam'
    id = db.Column(UUID(as_uuid=True), primary_key=True, default=default_uuid)
    thietbiduockiemtrafield = db.relationship('ThietBiDuocKiemTra', cascade="all, delete-orphan")
    nam = db.Column(BigInteger())


class ThietBiDuocKiemTra(CommonModel):
    __tablename__ = 'thietbiduockiemtra'
    id = db.Column(UUID(as_uuid=True), primary_key=True, default=default_uuid)
    bangkehoachkiemtrathietbitheonam_id = db.Column(UUID(as_uuid=True), ForeignKey('bangkehoachkiemtrathietbitheonam.id'), nullable=True)
    thietbi_id = db.Column(UUID(as_uuid=True),db.ForeignKey('thietbi.id'), nullable=True)
    thietbi = db.relationship('ThietBi', viewonly=True)
    tuan1 = db.Column(String(1))
    datatuan1 = db.Column(JSONB)
    tuan2 = db.Column(String(1))
    datatuan2 = db.Column(JSONB)
    tuan3 = db.Column(String(1))
    datatuan3 = db.Column(JSONB)
    tuan4 = db.Column(String(1))
    datatuan4 = db.Column(JSONB)
    tuan5 = db.Column(String(1))
    datatuan5 = db.Column(JSONB)
    tuan6 = db.Column(String(1))
    datatuan6 = db.Column(JSONB)
    tuan7 = db.Column(String(1))
    datatuan7 = db.Column(JSONB)
    tuan8 = db.Column(String(1))
    datatuan8 = db.Column(JSONB)
    tuan9 = db.Column(String(1))
    datatuan9 = db.Column(JSONB)
    tuan10 = db.Column(String(1))
    datatuan10 = db.Column(JSONB)
    tuan11 = db.Column(String(1))
    datatuan11 = db.Column(JSONB)
    tuan12 = db.Column(String(1))
    datatuan12 = db.Column(JSONB)
    tuan13 = db.Column(String(1))
    datatuan13 = db.Column(JSONB)
    tuan14 = db.Column(String(1))
    datatuan14 = db.Column(JSONB)
    tuan15 = db.Column(String(1))
    datatuan15 = db.Column(JSONB)
    tuan16 = db.Column(String(1))
    datatuan16 = db.Column(JSONB)
    tuan17 = db.Column(String(1))
    datatuan17 = db.Column(JSONB)
    tuan18 = db.Column(String(1))
    datatuan18 = db.Column(JSONB)
    tuan19 = db.Column(String(1))
    datatuan19 = db.Column(JSONB)
    tuan20 = db.Column(String(1))
    datatuan20 = db.Column(JSONB)
    tuan21 = db.Column(String(1))
    datatuan21 = db.Column(JSONB)
    tuan22 = db.Column(String(1))
    datatuan22 = db.Column(JSONB)
    tuan23 = db.Column(String(1))
    datatuan23 = db.Column(JSONB)
    tuan24 = db.Column(String(1))
    datatuan24 = db.Column(JSONB)
    tuan25 = db.Column(String(1))
    datatuan25 = db.Column(JSONB)
    tuan26 = db.Column(String(1))
    datatuan26 = db.Column(JSONB)
    tuan27 = db.Column(String(1))
    datatuan27 = db.Column(JSONB)
    tuan28 = db.Column(String(1))
    datatuan28 = db.Column(JSONB) 
    tuan29 = db.Column(String(1))
    datatuan29 = db.Column(JSONB)
    tuan30 = db.Column(String(1))
    datatuan30 = db.Column(JSONB)
    tuan31 = db.Column(String(1))
    datatuan31 = db.Column(JSONB)
    tuan32 = db.Column(String(1))
    datatuan32 = db.Column(JSONB)
    tuan33 = db.Column(String(1))
    datatuan33 = db.Column(JSONB)
    tuan34 = db.Column(String(1))
    datatuan34 = db.Column(JSONB)
    tuan35 = db.Column(String(1))
    datatuan35 = db.Column(JSONB)
    tuan36 = db.Column(String(1))
    datatuan36 = db.Column(JSONB)
    tuan37 = db.Column(String(1))
    datatuan37 = db.Column(JSONB)
    tuan38 = db.Column(String(1))
    datatuan38 = db.Column(JSONB)
    tuan39 = db.Column(String(1))
    datatuan39 = db.Column(JSONB)
    tuan40 = db.Column(String(1))
    datatuan40 = db.Column(JSONB)
    tuan41 = db.Column(String(1))
    datatuan41 = db.Column(JSONB)
    tuan42 = db.Column(String(1))
    datatuan42 = db.Column(JSONB)
    tuan43 = db.Column(String(1))
    datatuan43 = db.Column(JSONB)
    tuan44 = db.Column(String(1))
    datatuan44 = db.Column(JSONB)
    tuan45 = db.Column(String(1))
    datatuan45 = db.Column(JSONB)
    tuan46 = db.Column(String(1))
    datatuan46 = db.Column(JSONB)
    tuan47 = db.Column(String(1))
    datatuan47 = db.Column(JSONB)
    tuan48 = db.Column(String(1))
    datatuan48 = db.Column(JSONB)
    tuan49 = db.Column(String(1))
    datatuan49 = db.Column(JSONB)
    tuan50 = db.Column(String(1))
    datatuan50 = db.Column(JSONB)
    tuan51 = db.Column(String(1))
    datatuan51 = db.Column(JSONB)
    tuan52 = db.Column(String(1))
    datatuan52 = db.Column(JSONB)
    tuan53 = db.Column(String(1))
    datatuan53 = db.Column(JSONB)
    giaytodikem_id =db.Column(JSONB)

class DuToanSuaChuaNam(CommonModel):
    __tablename__ = 'dutoansuachuanam'
    id = db.Column(UUID(as_uuid=True), primary_key=True, default=default_uuid)
    nam = db.Column(BigInteger())
class DuToanSuaChua(CommonModel):
    __tablename__ = 'dutoansuachua'
    id = db.Column(UUID(as_uuid=True), primary_key=True, default=default_uuid)
    noidung = db.Column(String(255))
    dutoanchitiet = db.Column(String(255))
    donvitinh = db.Column(String(255))
    soluong = db.Column(BigInteger())
    dongia = db.Column(String(255))
    thanhtien = db.Column(BigInteger())
    ghichu = db.Column(String(255))
    ngaylap = db.Column(BigInteger())
    nguoilap = db.Column(String(255))



