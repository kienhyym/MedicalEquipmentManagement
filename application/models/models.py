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
    vaitro = db.Column(Integer())
    khoa_id = db.Column(UUID(as_uuid=True),db.ForeignKey('khoa.id'), nullable=True)
    khoa = db.relationship('Khoa', viewonly=True)
    phong_id = db.Column(UUID(as_uuid=True),db.ForeignKey('phong.id'), nullable=True)
    phong = db.relationship('Phong', viewonly=True)
    
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
    danhsachhanche = db.Column(String(255),default='dangduocsudung')
    bangphanloai = db.Column(String(255))
    congkhaiphanloai = db.Column(String(255))
    chungloailoaithietbi = db.Column(String(255))
    chitietsanphamfield = db.relationship('ChiTietThietBi', cascade="all, delete-orphan")
    quytrinhkiemtrafield = db.relationship('QuyTrinhKiemTra', cascade="all, delete-orphan")

class ChiTietThietBi(CommonModel):
    __tablename__ = 'chitietthietbi'
    id = db.Column(UUID(as_uuid=True), primary_key=True, default=default_uuid)
    tenthietbi = db.Column(String(255))
    model_serial_number = db.Column(String(255))
    ma_qltb = db.Column(String(255))
    noisanxuat = db.Column(String(255))
    danhsachhanche = db.Column(String(255),default='khong')
    ngaymua = db.Column(BigInteger())
    nhacungcap_id = db.Column(UUID(as_uuid=True),db.ForeignKey('donvi.id'), nullable=True)
    nhacungcap = db.relationship('DonVi', viewonly=True)
    quocgia_id = db.Column(UUID(as_uuid=True),db.ForeignKey('quocgia.id'), nullable=True)
    quocgia = db.relationship('QuocGia', viewonly=True)
    hangsanxuat_id = db.Column(UUID(as_uuid=True),db.ForeignKey('hangsanxuat.id'), nullable=True)
    hangsanxuat = db.relationship('HangSanXuat', viewonly=True)
    baohanhtungay = db.Column(BigInteger())
    baohanhdenngay = db.Column(BigInteger())
    hetbaohanh = db.Column(String(255))
    khoa_id = db.Column(UUID(as_uuid=True),db.ForeignKey('khoa.id'), nullable=True)
    khoa = db.relationship('Khoa', viewonly=True)
    phong_id = db.Column(UUID(as_uuid=True),db.ForeignKey('phong.id'), nullable=True)
    phong = db.relationship('Phong', viewonly=True)
    thongsokythuat = db.Column(Text())
    phukien = db.Column(Text())
    tinhtrangthietbikhimua = db.Column(String(255))
    yeucauvebaoduong = db.Column(Text())
    noidungbaoduong = db.Column(Text())
    luuykhisudung = db.Column(Text())
    ngaynhap = db.Column(BigInteger())
    trangthai = db.Column(String(255))
    chungloailoaithietbi = db.Column(String(255))
    thietbi_id = db.Column(UUID(as_uuid=True), ForeignKey('thietbi.id'), nullable=True)
    phieuyeucausuachuafield = db.relationship('PhieuYeuCauSuaChua', cascade="all, delete-orphan")
    bangkiemtrathietbifield = db.relationship('BangKiemTraThietBi', cascade="all, delete-orphan")
    bienbanxacnhantinhtrangthietbifield = db.relationship('BienBanXacNhanTinhTrangThietBi', cascade="all, delete-orphan")
    bangkiemdinhfield = db.relationship('BangKiemDinh', cascade="all, delete-orphan")

class QuyTrinhKiemTra(CommonModel):
    __tablename__ = 'quytrinhkiemtra'
    id = db.Column(UUID(as_uuid=True), primary_key=True, default=default_uuid)
    buockiemtra = db.Column(Integer()) 
    noidungkiemtra = db.Column(String())
    hinhanh = db.Column(String(255)) 
    thietbi_id = db.Column(UUID(as_uuid=True), ForeignKey('thietbi.id'), nullable=True)
    
class HangSanXuat(CommonModel):
    __tablename__ = 'hangsanxuat'
    id = db.Column(UUID(as_uuid=True), primary_key=True, default=default_uuid)
    ma = db.Column(String(255), index=True)
    ten = db.Column(String(255))
    thongtin = db.Column(String(255))




class Khoa(CommonModel):
    __tablename__ = 'khoa'
    id = db.Column(UUID(as_uuid=True), primary_key=True, default=default_uuid)
    ma = db.Column(String(255))
    ten = db.Column(String(255))
    thongtin = db.Column(String(255))
    phongfield = db.relationship('Phong', cascade="all, delete-orphan")

class Phong(CommonModel):
    __tablename__ = 'phong'
    id = db.Column(UUID(as_uuid=True), primary_key=True, default=default_uuid)
    ma = db.Column(String(255))
    ten = db.Column(String(255))
    thongtin = db.Column(String(255))
    khoa_id = db.Column(UUID(as_uuid=True),db.ForeignKey('khoa.id'), nullable=True)
    khoa = db.relationship('Khoa', viewonly=True)


class ThongBao(CommonModel):
    __tablename__ = 'thongbao'
    id = db.Column(UUID(as_uuid=True), primary_key=True, default=default_uuid)
    tenthietbi = db.Column(String(255))
    model_serial_number = db.Column(String(255))
    idloaithongbao = db.Column(String(255))
    loaithongbao = db.Column(String(255))
    maloaithongbao = db.Column(String(255))
    daxem = db.Column(String(255))
    ngaytao = db.Column(BigInteger())

class PhieuYeuCauSuaChua(CommonModel):
    __tablename__ = 'phieuyeucausuachua'
    id = db.Column(UUID(as_uuid=True), primary_key=True, default=default_uuid)
    tenthietbi = db.Column(String(255))
    model_serial_number = db.Column(String(255))
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
    daxem = db.Column(String(5))
    trangthai = db.Column(String(15))
    daduyet = db.Column(String(10),default='chuaduyet')


class BienBanXacNhanTinhTrangThietBi(CommonModel):
    __tablename__ = 'bienbanxacnhantinhtrangthietbi'
    id = db.Column(UUID(as_uuid=True), primary_key=True, default=default_uuid)
    tenthietbi = db.Column(String(255))
    tai = db.Column(String(255))
    model_serial_number = db.Column(String(255))
    ma_qltb = db.Column(String(255))
    nha = db.Column(String(255))
    nguoisudung = db.Column(String(255))
    donvi = db.Column(String(255))
    ketquakiemtra = db.Column(Text())
    huongkhacphuc = db.Column(Text())
    ngay = db.Column(BigInteger())
    chuky = db.Column(String(10))
    chitietthietbi_id = db.Column(UUID(as_uuid=True), ForeignKey('chitietthietbi.id'), nullable=True)
    daxem = db.Column(String(5))

class BangKiemTraThietBi(CommonModel):
    __tablename__ = 'bangkiemtrathietbi'
    id = db.Column(UUID(as_uuid=True), primary_key=True, default=default_uuid)
    ngay = db.Column(BigInteger())
    tinhtrang = db.Column(String(255))
    mota = db.Column(String(255))
    nguoikiemtra_id = db.Column(String(255))
    nguoikiemtra = db.Column(String(255))
    khoa_id = db.Column(UUID(as_uuid=True),db.ForeignKey('khoa.id'), nullable=True)
    khoa = db.relationship('Khoa', viewonly=True)
    phong_id = db.Column(UUID(as_uuid=True),db.ForeignKey('phong.id'), nullable=True)
    phong = db.relationship('Phong', viewonly=True)
    tenthietbi = db.Column(String(255))
    model_serial_number = db.Column(String(255))
    ma_qltb = db.Column(String(255))
    daxem = db.Column(String(5))
    daduyet = db.Column(String(10),default='chuaduyet')
    attachment = db.Column(String(255))
    chitietthietbi_id = db.Column(UUID(as_uuid=True), ForeignKey('chitietthietbi.id'), nullable=True)
    buockiemtrafield = db.relationship('BuocKiemTra', cascade="all, delete-orphan")
    
class BuocKiemTra(CommonModel):
    __tablename__ = 'buockiemtra'
    id = db.Column(UUID(as_uuid=True), primary_key=True, default=default_uuid)
    ghichu = db.Column(String(255))
    buockiemtra = db.Column(Integer()) 
    hinhanh = db.Column(String()) 
    thoigian = db.Column(String(255)) 
    tinhtrang = db.Column(String(255)) 
    bangkiemtrathietbi_id = db.Column(UUID(as_uuid=True), ForeignKey('bangkiemtrathietbi.id'), nullable=True)



class BangKiemDinh(CommonModel):
    __tablename__ = 'bangkiemdinh'
    id = db.Column(UUID(as_uuid=True), primary_key=True, default=default_uuid)
    ma = db.Column(String(255), index=True)
    donvi = db.Column(String(255))
    ngaycap = db.Column(BigInteger())
    ngayhethan = db.Column(BigInteger())
    attachment = db.Column(String())
    tinhtrang = db.Column(String(255),default='dangduocsudung')
    tenthietbi = db.Column(String(255))
    model_serial_number = db.Column(String(255))
    ma_qltb = db.Column(String(255))
    daxem = db.Column(String(5))
    chitietthietbi_id = db.Column(UUID(as_uuid=True), ForeignKey('chitietthietbi.id'), nullable=True)