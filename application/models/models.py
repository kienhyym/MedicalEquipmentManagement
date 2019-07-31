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
    name = db.Column(db.String(80), unique=True)
    description = db.Column(db.String(255))
    

    
class User(CommonModel):
    __tablename__ = 'user'
    id = db.Column(UUID(as_uuid=True), primary_key=True, default=default_uuid)
    phone_number =  db.Column(String(50), index=True, nullable=True)
    email =  db.Column(String(50), index=True, nullable=True)
    name = db.Column(String(50))
    password = db.Column(String, nullable=True)
    zalo_id = db.Column(db.Integer)
    salt = db.Column(db.String())
    type = db.Column(db.String())
    captren_id = db.Column(db.String())
    captren_name = db.Column(db.String())
    description = db.Column(db.String())
    active = db.Column(db.Boolean(), default=True)
    roles = db.relationship('Role', secondary=roles_users, cascade="save-update")
    def has_role(self, role):
        if isinstance(role, str):
            return role in (role.name for role in self.roles)
        else:
            return role in self.roles


class QuocGia(CommonModel):
    __tablename__ = 'quocgia'
    id = db.Column(UUID(as_uuid=True), primary_key=True, default=default_uuid)
    ma = db.Column(String(255), unique=True)
    ten = db.Column(String(255))
class TinhThanh(CommonModel):
    __tablename__ = 'tinhthanh'
    id = db.Column(UUID(as_uuid=True), primary_key=True, default=default_uuid)
    ma = db.Column(String(255), unique=True)
    ten = db.Column(String(255))
    quocgia_id = db.Column(UUID(as_uuid=True), ForeignKey('quocgia.id'), nullable=True)
    quocgia = relationship('QuocGia')
    quanhuyen = db.relationship("QuanHuyen", order_by="QuanHuyen.id", cascade="all, delete-orphan")
class QuanHuyen(CommonModel):
    __tablename__ = 'quanhuyen'
    id = db.Column(UUID(as_uuid=True), primary_key=True, default=default_uuid)
    ma = db.Column(String(255), unique=True)
    ten = db.Column(String(255))
    tinhthanh_id = db.Column(UUID(as_uuid=True), ForeignKey('tinhthanh.id'), nullable=True)
    tinhthanh = relationship('TinhThanh')
    xaphuong = db.relationship("XaPhuong", order_by="XaPhuong.id", cascade="all, delete-orphan")
    
class XaPhuong(CommonModel):
    __tablename__ = 'xaphuong'
    id = db.Column(UUID(as_uuid=True), primary_key=True, default=default_uuid)
    ma = db.Column(String(255), unique=True)
    ten = db.Column(String(255))
    quanhuyen_id = db.Column(UUID(as_uuid=True), ForeignKey('quanhuyen.id'), nullable=True)
    quanhuyen = relationship('QuanHuyen')  




# Báo cáo 1 Phụ lục 2
#Thông tin chung
class HSQLSucKhoeVaBenhTatNguoiLaoDong(CommonModel):
    __tablename__ = 'hsqlsuckhoevabenhtatnguoilaodong'
    id = db.Column(UUID(as_uuid=True), primary_key=True, default=default_uuid)
    tencosolaodong = db.Column(String(255))
    nganhchuquan = db.Column(String(255))
    diachi = db.Column(String(255))
    dienthoai = db.Column(String(255))
    sofax = db.Column(String(255))
    email = db.Column(String(255))
    website = db.Column(String(255))
    nguoilienhe = db.Column(String(255))
    nam = db.Column(String(255))
    bangqlsuckhoetruockhibotrivieclamfield = db.relationship('BangQLSucKhoeTruocKhiBoTriViecLam', cascade="all, delete-orphan")
    bangqlsuckhoelaodongthongquakhamsuckhoedinhkyfield = db.relationship('BangQLSucKhoeLaoDongThongQuaKhamSucKhoeDinhKy', cascade="all, delete-orphan")
    bangsotruonghopmaccacloaibenhthongthuongfield = db.relationship('BangSoTruongHopMacCacLoaiBenhThongThuong', cascade="all, delete-orphan")
    bangcactruonghopmacbenhnghenghiepfield = db.relationship('BangCacTruongHopMacBenhNgheNghiep', cascade="all, delete-orphan")
    bangcactruonghoptainanlaodongfield = db.relationship('BangCacTruongHopTaiNanLaoDong', cascade="all, delete-orphan")
    bangtinhhinhnghiviecfield = db.relationship('BangTinhHinhNghiViec', cascade="all, delete-orphan")
    bangquanlybenhmantinhfield = db.relationship('BangQuanLyBenhManTinh', cascade="all, delete-orphan")
    bangquanlybenhmantinhtheotungbenhfield = db.relationship('BangQuanLyBenhManTinhTheoTungBenh', cascade="all, delete-orphan")
    BangTheoDoiBenhNgheNghiepfield = db.relationship('BangTheoDoiBenhNgheNghiep', cascade="all, delete-orphan")
    bangdanhsachnguoilaodongmacbenhnghenghiepfield = db.relationship('BangDanhSachNguoiLaoDongMacBenhNgheNghiep', cascade="all, delete-orphan")
#biểu mẫu 1
class BangQLSucKhoeTruocKhiBoTriViecLam(CommonModel):
    __tablename__ = 'bangqlsuckhoetruockhibotrivieclam'
    id = db.Column(UUID(as_uuid=True), primary_key=True, default=default_uuid)
    ngaythangnam = db.Column(db.DateTime())
    soduockhamtuyennam = db.Column(String(255))
    soduockhamtuyennu = db.Column(String(255))
    tongcong = db.Column(String(255))
    phanloaisuckhoeloai1 = db.Column(db.Boolean(), default=False)
    phanloaisuckhoeloai2 = db.Column(db.Boolean(), default=False)
    phanloaisuckhoeloai3 = db.Column(db.Boolean(), default=False)
    phanloaisuckhoeloai4 = db.Column(db.Boolean(), default=False)
    phanloaisuckhoeloai5 = db.Column(db.Boolean(), default=False)
    hsqlsuckhoevabenhtatnguoilaodong_id = db.Column(UUID(as_uuid=True), ForeignKey('hsqlsuckhoevabenhtatnguoilaodong.id'), nullable=True)
    hsqlsuckhoevabenhtatnguoilaodong = relationship('HSQLSucKhoeVaBenhTatNguoiLaoDong')  
#biểu mẫu 2
class BangQLSucKhoeLaoDongThongQuaKhamSucKhoeDinhKy(CommonModel):
    __tablename__ = 'bangqlsuckhoelaodongthongquakhamsuckhoedinhky'
    id = db.Column(UUID(as_uuid=True), primary_key=True, default=default_uuid)
    ngaythangnam = db.Column(db.DateTime())
    soduockhamtuyennam = db.Column(String(255))
    soduockhamtuyennu = db.Column(String(255))
    tongcong = db.Column(String(255))
    phanloaisuckhoeloai1 = db.Column(db.Boolean(), default=False)
    phanloaisuckhoeloai2 = db.Column(db.Boolean(), default=False)
    phanloaisuckhoeloai3 = db.Column(db.Boolean(), default=False)
    phanloaisuckhoeloai4 = db.Column(db.Boolean(), default=False)
    phanloaisuckhoeloai5 = db.Column(db.Boolean(), default=False)
    hsqlsuckhoevabenhtatnguoilaodong_id = db.Column(UUID(as_uuid=True), ForeignKey('hsqlsuckhoevabenhtatnguoilaodong.id'), nullable=True)
    hsqlsuckhoevabenhtatnguoilaodong = relationship('HSQLSucKhoeVaBenhTatNguoiLaoDong')  
#Biểu mẫu 3: TÌNH HÌNH BỆNH TẬT TRONG THỜI GIAN BÁO CÁO
# I. Số trường hợp mắc các loại bệnh thông thường:
class BangSoTruongHopMacCacLoaiBenhThongThuong(CommonModel):
    __tablename__ = 'bangsotruonghopmaccacloaibenhthongthuong'
    id = db.Column(UUID(as_uuid=True), primary_key=True, default=default_uuid)
    nhombenh = db.Column(String(255))
    sotruonghopquy1 = db.Column(String(255))
    sotruonghopquy2 = db.Column(String(255))
    sotruonghopquy3 = db.Column(String(255))
    sotruonghopquy4 = db.Column(String(255))
    hsqlsuckhoevabenhtatnguoilaodong_id = db.Column(UUID(as_uuid=True), ForeignKey('hsqlsuckhoevabenhtatnguoilaodong.id'), nullable=True)
    hsqlsuckhoevabenhtatnguoilaodong = relationship('HSQLSucKhoeVaBenhTatNguoiLaoDong')  
# II. Các trường hợp mắc bệnh nghề nghiệp
class BangCacTruongHopMacBenhNgheNghiep(CommonModel):
    __tablename__ = 'bangcactruonghopmacbenhnghenghiep'
    id = db.Column(UUID(as_uuid=True), primary_key=True, default=default_uuid)
    nhombenh = db.Column(String(255))
    sotruonghopquy1 = db.Column(String(255))
    sotruonghopquy2 = db.Column(String(255))
    sotruonghopquy3 = db.Column(String(255))
    sotruonghopquy4 = db.Column(String(255))
    hsqlsuckhoevabenhtatnguoilaodong_id = db.Column(UUID(as_uuid=True), ForeignKey('hsqlsuckhoevabenhtatnguoilaodong.id'), nullable=True)
    hsqlsuckhoevabenhtatnguoilaodong = relationship('HSQLSucKhoeVaBenhTatNguoiLaoDong')  
# III. Các trường hợp tai nạn lao động
class BangCacTruongHopTaiNanLaoDong(CommonModel):
    __tablename__ = 'bangcactruonghoptainanlaodong'
    id = db.Column(UUID(as_uuid=True), primary_key=True, default=default_uuid)
    nhombenh = db.Column(String(255))
    sotruonghopquy1mac = db.Column(String(255))
    sotruonghopquy1chet = db.Column(String(255))
    sotruonghopquy2mac = db.Column(String(255))
    sotruonghopquy2chet = db.Column(String(255))
    sotruonghopquy3mac = db.Column(String(255))
    sotruonghopquy3chet = db.Column(String(255))
    sotruonghopquy4mac = db.Column(String(255))
    sotruonghopquy4chet = db.Column(String(255))
    hsqlsuckhoevabenhtatnguoilaodong_id = db.Column(UUID(as_uuid=True), ForeignKey('hsqlsuckhoevabenhtatnguoilaodong.id'), nullable=True)
    hsqlsuckhoevabenhtatnguoilaodong = relationship('HSQLSucKhoeVaBenhTatNguoiLaoDong')  
# Biểu mẫu 4:TÌNH HÌNH NGHỈ VIỆC DO ỐM, TAI NẠN LAO ĐỘNG VÀ BỆNH NGHỀ NGHIỆP
class BangTinhHinhNghiViec(CommonModel):
    __tablename__ = 'bangtinhhinhnghiviec'
    id = db.Column(UUID(as_uuid=True), primary_key=True, default=default_uuid)
    songuoiom = db.Column(String(255))
    phantramom = db.Column(String(255))
    tongsongayom = db.Column(String(255))
    songaytrungbinhom = db.Column(String(255))
    songuoitainanlaodong = db.Column(String(255))
    phantramtainanlaodong = db.Column(String(255))
    tongsongaytainanlaodong = db.Column(String(255))
    songaytrungbinhtainanlaodong = db.Column(String(255))
    songuoibenhnghenghiep = db.Column(String(255))
    phantrambenhnghenghiep = db.Column(String(255))
    tongsongaybenhnghenghiep = db.Column(String(255))
    songaytrungbinhbenhnghenghiep = db.Column(String(255))
    hsqlsuckhoevabenhtatnguoilaodong_id = db.Column(UUID(as_uuid=True), ForeignKey('hsqlsuckhoevabenhtatnguoilaodong.id'), nullable=True)
    hsqlsuckhoevabenhtatnguoilaodong = relationship('HSQLSucKhoeVaBenhTatNguoiLaoDong')  
# Biểu mẫu 5:QUẢN LÝ BỆNH MẠN TÍNH (*)
class BangQuanLyBenhManTinh(CommonModel):
    __tablename__ = 'bangquanlybenhmantinh'
    id = db.Column(UUID(as_uuid=True), primary_key=True, default=default_uuid)
    phanxuongkhuvuc  = db.Column(String(255))
    tenbenhnhan = db.Column(String(255))
    tenbenh = db.Column(String(255))
    tuoinam = db.Column(db.Integer())
    tuoinu = db.Column(db.Integer())
    tuoinghe = db.Column(String(255))
    phuongphapdieutri = db.Column(String(255))
    tinhtrang = db.Column(String(255))
    luuykhibotricongviec = db.Column(db.DateTime())
    hsqlsuckhoevabenhtatnguoilaodong_id = db.Column(UUID(as_uuid=True), ForeignKey('hsqlsuckhoevabenhtatnguoilaodong.id'), nullable=True)
    hsqlsuckhoevabenhtatnguoilaodong = relationship('HSQLSucKhoeVaBenhTatNguoiLaoDong')  
# Biểu mẫu 6:QUẢN LÝ BỆNH MẠN TÍNH THEO TỪNG BỆNH
class BangQuanLyBenhManTinhTheoTungBenh(CommonModel):
    __tablename__ = 'bangquanlybenhmantinhtheotungbenh'
    id = db.Column(UUID(as_uuid=True), primary_key=True, default=default_uuid)
    tenbenh = db.Column(String(255))
    phanxuongkhuvuc  = db.Column(String(255))
    tenbenhnhan = db.Column(String(255))
    tuoinam = db.Column(db.Integer())
    tuoinu = db.Column(db.Integer())
    tuoinghe = db.Column(db.Integer())
    phuongphapdieutri = db.Column(String(255))
    tinhtrang = db.Column(String(255))
    luuykhibotricongviec = db.Column(db.DateTime())
    hsqlsuckhoevabenhtatnguoilaodong_id = db.Column(UUID(as_uuid=True), ForeignKey('hsqlsuckhoevabenhtatnguoilaodong.id'), nullable=True)
    hsqlsuckhoevabenhtatnguoilaodong = relationship('HSQLSucKhoeVaBenhTatNguoiLaoDong')  
# Biểu mẫu 7:THEO DÕI BỆNH NGHỀ NGHIỆP
class BangTheoDoiBenhNgheNghiep(CommonModel):
    __tablename__ = 'bangtheodoibenhnghenghiep'
    id = db.Column(UUID(as_uuid=True), primary_key=True, default=default_uuid)
    ngaythangnam = db.Column(db.DateTime())
    tenbenh = db.Column(String(255))
    tongsokham = db.Column(db.Integer())
    tongsokhamnu = db.Column(db.Integer())
    tongsochuandoan = db.Column(db.Integer())
    tongsochuandoannu = db.Column(db.Integer())
    tongsogiamdinh = db.Column(db.Integer())
    tongsogiamdinhnu = db.Column(db.Integer())
    tongsogiamdinhnhohon5phantram = db.Column(db.Integer())
    tongsogiamdinhnhohon5phantramnu = db.Column(db.Integer())
    tongsogiamdinhlonhon31phantram = db.Column(db.Integer())
    tongsogiamdinhlonhon31phantramnu = db.Column(db.Integer())
    tongsogiamdinhlonhon5nhohon31phantram= db.Column(db.Integer())
    tongsogiamdinhlonhon5nhohon31phantramnu = db.Column(db.Integer())
    hsqlsuckhoevabenhtatnguoilaodong_id = db.Column(UUID(as_uuid=True), ForeignKey('hsqlsuckhoevabenhtatnguoilaodong.id'), nullable=True)
    hsqlsuckhoevabenhtatnguoilaodong = relationship('HSQLSucKhoeVaBenhTatNguoiLaoDong')  
# Biểu mẫu 8:DANH SÁCH NGƯỜI LAO ĐỘNG MẮC BỆNH NGHỀ NGHIỆP
class BangDanhSachNguoiLaoDongMacBenhNgheNghiep(CommonModel):
    __tablename__ = 'bangdanhsachnguoilaodongmacbenhnghenghiep'
    id = db.Column(UUID(as_uuid=True), primary_key=True, default=default_uuid)
    tenbenhnhan = db.Column(String(255))
    tuoinam = db.Column(db.Integer())
    tuoinu = db.Column(db.Integer())
    nghekhibibenhnghenghiep  = db.Column(String(255))
    tuoinghe = db.Column(db.Integer())
    ngayphathienbenhnghenghiep = db.Column(db.DateTime())
    tenbenhnghenghiep = db.Column(String(255))
    phuongphapdieutri = db.Column(String(255))
    tylematkhananglaodong = db.Column(String(255))
    congviechiennay = db.Column(String(255))
    luuykhibotricongviec = db.Column(String(255))
    hsqlsuckhoevabenhtatnguoilaodong_id = db.Column(UUID(as_uuid=True), ForeignKey('hsqlsuckhoevabenhtatnguoilaodong.id'), nullable=True)
    hsqlsuckhoevabenhtatnguoilaodong = relationship('HSQLSucKhoeVaBenhTatNguoiLaoDong')  
# Hết báo cáo 1 Phụ lục 2
##########################################################################################
# Báo cáo 1 Phụ lục 3
class HSCCTaiNanLaoDongTaiCoSoLaoDong(CommonModel):
    __tablename__ = 'hscctainanlaodongtaicosolaodong'
    id = db.Column(UUID(as_uuid=True), primary_key=True, default=default_uuid)
    tencosolaodong = db.Column(String(255))
    nganhchuquan = db.Column(String(255))
    diachi = db.Column(String(255))
    dienthoai = db.Column(String(255))
    sofax = db.Column(String(255))
    email = db.Column(String(255))
    website = db.Column(String(255))
    nguoilienhe = db.Column(String(255))
    nguoilaphoso = db.Column(String(255))
    nam = db.Column(String(255))
    banghscctainanlaodongtaicosolaodongfield = db.relationship('BangHSCCTaiNanLaoDongTaiCoSoLaoDong', cascade="all, delete-orphan")

class BangHSCCTaiNanLaoDongTaiCoSoLaoDong(CommonModel):
    __tablename__ = 'banghscctainanlaodongtaicosolaodong'
    id = db.Column(UUID(as_uuid=True), primary_key=True, default=default_uuid)
    ngaythangnam = db.Column(db.DateTime())
    hotennannhan  = db.Column(String(255))
    tuoinam = db.Column(db.Integer())
    tuoinu = db.Column(db.Integer())
    thoigianbitainanlaodong = db.Column(String(255))
    thoigiancapcuutaicho = db.Column(String(255))
    thoigiannannhanthuongtich = db.Column(String(255))
    yeutogaytainan = db.Column(String(255))
    xutricapcuu = db.Column(String(255))
    thoigiannghiviec = db.Column(db.DateTime())
    ketquagiamdinhtylematsulaodong = db.Column(String(255))
    hscctainanlaodongtaicosolaodong_id = db.Column(UUID(as_uuid=True), ForeignKey('hscctainanlaodongtaicosolaodong.id'), nullable=True)
    hscctainanlaodongtaicosolaodong = relationship('HSCCTaiNanLaoDongTaiCoSoLaoDong')  
# Hết Báo cáo 1 Phụ lục 3
