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
    salt = db.Column(db.String())
    type = db.Column(db.String())
    donvi_id = db.Column(UUID(as_uuid=True),db.ForeignKey('donvi.id'), nullable=True)
    donvi = db.relationship('DonVi', viewonly=True)
    description = db.Column(db.String())
    active = db.Column(db.Boolean(), default=True)
    roles = db.relationship('Role', secondary=roles_users, cascade="save-update")
    userconnectionchannels = db.relationship('UserConnectionChannel', cascade="all, delete-orphan")

    def has_role(self, role):
        if isinstance(role, str):
            return role in (role.name for role in self.roles)
        else:
            return role in self.roles
# class Image(CommonModel):
#     __tablename__ = 'image'
#     id = db.Column(UUID(as_uuid=True), primary_key=True, default=default_uuid)
#     user_id = db.Column(UUID(as_uuid=True), ForeignKey('user.id'), nullable=True)
#     user = db.relationship('User', viewonly=True)
#     value = db.Column(String(255))

class DonVi(CommonModel):
    __tablename__ = 'donvi'
    id = db.Column(UUID(as_uuid=True), primary_key=True, default=default_uuid)
    ma = db.Column(db.String(255), nullable=True)
    ten = db.Column(db.String(255), nullable=False)
    sodienthoai = db.Column(db.String(63))
    diachi = db.Column(db.String(255))
    email = db.Column(db.String(255))
    ghichu = db.Column(db.String(255))
    vungmien = db.Column(db.SmallInteger) #

    quocgia_id = db.Column(UUID(as_uuid=True), db.ForeignKey('quocgia.id'), nullable=True)
    quocgia = db.relationship('QuocGia', viewonly=True)

    tinhthanh_id = db.Column(UUID(as_uuid=True), db.ForeignKey('tinhthanh.id'), nullable=True)
    tinhthanh = db.relationship('TinhThanh', viewonly=True)
    
    quanhuyen_id = db.Column(UUID(as_uuid=True), db.ForeignKey('quanhuyen.id'), nullable=True)
    quanhuyen = db.relationship('QuanHuyen', viewonly=True)

    xaphuong_id = db.Column(UUID(as_uuid=True), db.ForeignKey('xaphuong.id'), nullable=True)
    xaphuong = db.relationship('XaPhuong', viewonly=True)
    
    tuyendonvi = db.Column(db.SmallInteger, nullable=False) # la trung tam, hay truong hoc ...
    coquanchuquan = db.Column(db.String(255))
    parent_id = db.Column(db.Integer, nullable=True)
    
    giamdoc = db.Column(db.String)
    sdtgiamdoc = db.Column(db.String)
    emailgiamdoc = db.Column(db.String)
    phogiamdoc = db.Column(db.String)
    sdtphogiamdoc = db.Column(db.String)
    emailphogiamdoc = db.Column(db.String)
    
class UserConnectionChannel(CommonModel):
    __tablename__ = 'userconnectionchannel'
    id = db.Column(UUID(as_uuid=True), primary_key=True, default=default_uuid)
    user_id = db.Column(UUID(as_uuid=True), ForeignKey('user.id'), nullable=True)
    user = db.relationship('User', viewonly=True)
    channelname = db.Column(String(255))
    value = db.Column(String(255))

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
    phanloaisuckhoe =db.Column(db.Integer())
    hsqlsuckhoevabenhtatnguoilaodong_id = db.Column(UUID(as_uuid=True), ForeignKey('hsqlsuckhoevabenhtatnguoilaodong.id'), nullable=True)
#biểu mẫu 2
class BangQLSucKhoeLaoDongThongQuaKhamSucKhoeDinhKy(CommonModel):
    __tablename__ = 'bangqlsuckhoelaodongthongquakhamsuckhoedinhky'
    id = db.Column(UUID(as_uuid=True), primary_key=True, default=default_uuid)
    ngaythangnam = db.Column(db.DateTime())
    soduockhamtuyennam = db.Column(String(255))
    soduockhamtuyennu = db.Column(String(255))
    tongcong = db.Column(String(255))
    phanloaisuckhoe = db.Column(db.Integer())
    hsqlsuckhoevabenhtatnguoilaodong_id = db.Column(UUID(as_uuid=True), ForeignKey('hsqlsuckhoevabenhtatnguoilaodong.id'), nullable=True)
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
# Biểu mẫu 4:TÌNH HÌNH NGHỈ VIỆC DO ỐM, TAI NẠN LAO ĐỘNG VÀ BỆNH NGHỀ NGHIỆP
class BangTinhHinhNghiViec(CommonModel):
    __tablename__ = 'bangtinhhinhnghiviec'
    id = db.Column(UUID(as_uuid=True), primary_key=True, default=default_uuid)
    soluotnguoinghiom = db.Column(String(255))
    tongsongaynghiom = db.Column(String(255))
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
    luuykhibotricongviec = db.Column(String(255))
    hsqlsuckhoevabenhtatnguoilaodong_id = db.Column(UUID(as_uuid=True), ForeignKey('hsqlsuckhoevabenhtatnguoilaodong.id'), nullable=True)
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
    hsqlsuckhoevabenhtatnguoilaodong = ('HSQLSucKhoeVaBenhTatNguoiLaoDong')  
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
# Hết Báo cáo 1 Phụ lục 3
########################################################################################

# Báo cáo 1 Phụ lục 7

class SoTheoDoiCongTacHuanLuyenSoCuuCapCuuTaiNoiLamViec(CommonModel):
    __tablename__ = 'sotheodoicongtachuanluyensocuucapcuutainoilamviec'
    id = db.Column(UUID(as_uuid=True), primary_key=True, default=default_uuid)
    nam = db.Column(db.Integer())
    tencosohuanluyen = db.Column(String(255))
    thoigianthuchienhuanluyen = db.Column(String(255))
    bangdanhsachthanhvienlucluongsocuuduochuanluyenfield = db.relationship('BangDanhSachThanhVienLucLuongSoCuuDuocHuanLuyen', cascade="all, delete-orphan")
    bangdanhsachnguoilaodongduochuanluyenfield = db.relationship('BangDanhSachNguoiLaoDongDuocHuanLuyen', cascade="all, delete-orphan")
    giangvienthuchienhuanluyenfield = db.relationship('GiangVienThucHienHuanLuyen', cascade="all, delete-orphan")

class GiangVienThucHienHuanLuyen(CommonModel):
    __tablename__ = 'giangvienthuchienhuanluyen'
    id = db.Column(UUID(as_uuid=True), primary_key=True, default=default_uuid)
    ten  = db.Column(String(255))
    sotheodoicongtachuanluyensocuucapcuutainoilamviec_id = db.Column(UUID(as_uuid=True), ForeignKey('sotheodoicongtachuanluyensocuucapcuutainoilamviec.id'), nullable=True)

class BangDanhSachThanhVienLucLuongSoCuuDuocHuanLuyen(CommonModel):
    __tablename__ = 'bangdanhsachthanhvienlucluongsocuuduochuanluyen'
    id = db.Column(UUID(as_uuid=True), primary_key=True, default=default_uuid)
    hovaten  = db.Column(String(255))
    namsinhnam = db.Column(db.Integer())
    namsinhnu = db.Column(db.Integer())
    vitrilamviec = db.Column(String(255))
    sotheodoicongtachuanluyensocuucapcuutainoilamviec_id = db.Column(UUID(as_uuid=True), ForeignKey('sotheodoicongtachuanluyensocuucapcuutainoilamviec.id'), nullable=True)

class BangDanhSachNguoiLaoDongDuocHuanLuyen(CommonModel):
    __tablename__ = 'bangdanhsachnguoilaodongduochuanluyen'
    id = db.Column(UUID(as_uuid=True), primary_key=True, default=default_uuid)
    hovaten  = db.Column(String(255))
    namsinhnam = db.Column(db.Integer())
    namsinhnu = db.Column(db.Integer())
    vitrilamviec = db.Column(String(255))
    sotheodoicongtachuanluyensocuucapcuutainoilamviec_id = db.Column(UUID(as_uuid=True), ForeignKey('sotheodoicongtachuanluyensocuucapcuutainoilamviec.id'), nullable=True)

# Hết Báo cáo 1 Phụ lục 7
############################################################################################
# Báo cáo 1 Phụ lục 8
# I. Thông tin chung
class BaoCaoYTeLaoDongCuaCoSoLaoDong(CommonModel):
    __tablename__ = 'baocaoytelaodongcuacosolaodong'
    id = db.Column(UUID(as_uuid=True), primary_key=True, default=default_uuid)
    donvibaocao = db.Column(String(255))
    so = db.Column(String(255))
    noivietbaocao = db.Column(String(255))
    ngay = db.Column(String(255))
    thang = db.Column(String(255))
    nam = db.Column(String(255))
    kinhgui = db.Column(String(255))
    baocao6thangnam = db.Column(String(255))
    tencosolaodong = db.Column(String(255))
    tructhuoctinhthanhpho = db.Column(String(255))
    tructhuocbonganh = db.Column(String(255))
    diachi  = db.Column(String(255))
    sodienthoai = db.Column(String(255))
    email = db.Column(String(255))
    fax = db.Column(String(255))
    mathangsanxuatdichvuchinh = db.Column(String(255))
    tongsonguoilaodong = db.Column(db.Integer)
    songuoilaodongnu = db.Column(db.Integer)
    solaodongtructiepsanxuat = db.Column(db.Integer)
    solaodongnutructiepsanxuat = db.Column(db.Integer)
    solaodonglamviecnguyhiem = db.Column(db.Integer)
    solaodongnulamviecnguyhiem = db.Column(db.Integer)
    laphosovesinhkhong = db.Column(db.Integer)
# 7. Tổ chức bộ phận y tế 
    nguoilamcongtacytecokhong  = db.Column(db.Integer)
    tramphongkhambenhviencokhong = db.Column(db.Integer)
    tramphongkhambenhvienneuco  = db.Column(String(255))
# 7.3. Thuê, hợp đồng với đơn vị y tế:  
    thuehopdongvoidonviytecokhong = db.Column(db.Integer)
    tencosodichvuneuco = db.Column(String(255))
    diachidichvuneuco = db.Column(String(255))
    sodienthoaidichvuneuco = db.Column(String(255))
    noidungcungcapdichvuneuco = db.Column(String(255))
    thoigiancuncapdichvu = db.Column(db.DateTime())
# 8. Lực lượng sơ cứu tại nơi làm việc (đối với cơ sở sản xuất kinh doanh) 
    lucluongsocuutainoilamviec = db.Column(String(255))
    soluongnguoilaodongthamgiasocuu = db.Column(String(255))
    soluongnguoilaodongnuthamgiasocuu = db.Column(String(255))

    loai1nam = db.Column(String(255))
    loai2nam = db.Column(String(255))
    loai3nam = db.Column(String(255))
    loai4nam = db.Column(String(255))
    loai5nam = db.Column(String(255))
    loai1nu = db.Column(String(255))
    loai2nu = db.Column(String(255))
    loai3nu = db.Column(String(255))
    loai4nu = db.Column(String(255))
    loai5nu = db.Column(String(255))


    nguoilamcongtacytetaicosolaodongfield = db.relationship('NguoiLamCongTacYTeTaiCoSoLaoDong', cascade="all, delete-orphan")
    congtacthanhtrafield = db.relationship('CongTacThanhTra', cascade="all, delete-orphan")
    dieukienlaodongvasolaodongtiepxucyeutocohaifield = db.relationship('DieuKienLaoDongVaSoLaoDongTiepXucYeuToCoHai', cascade="all, delete-orphan")
    nghiviecdoomdautainanlaodongvabenhnghenghiepfield = db.relationship('NghiViecDoOmDauTaiNanLaoDongVaBenhNgheNghiep', cascade="all, delete-orphan")
    tinhhinhbenhnghenghieptaicosofield = db.relationship('TinhHinhBenhNgheNghiepTaiCoSo', cascade="all, delete-orphan")
    danhsachtruonghopbenhnghenghiepfield = db.relationship('DanhSachTruongHopBenhNgheNghiep', cascade="all, delete-orphan")
    cactruonghoptainanlaodongfield = db.relationship('CacTruongHopTaiNanLaoDong', cascade="all, delete-orphan")
    thongketongsotruonghopmaccacloaibenhthongthuongfield = db.relationship('ThongKeTongSoTruongHopMacCacLoaiBenhThongThuong', cascade="all, delete-orphan")
    cactruonghopmacbenhnghenghiepfield = db.relationship('CacTruongHopMacBenhNgheNghiep', cascade="all, delete-orphan")
    # phanloaisuckhoefield = db.relationship('PhanLoaiSucKhoe', cascade="all, delete-orphan")
    congtachuanluyenfield = db.relationship('CongTacHuanLuyen', cascade="all, delete-orphan")
    kinhphivesinhlaodongvachamsocsuckhoenguoilaodongfield = db.relationship('KinhPhiVeSinhLaoDongVaChamSocSucKhoeNguoiLaoDong', cascade="all, delete-orphan")
    cackiennghidukienvakehoachdukientrongkytoifield = db.relationship('CacKienNghiDuKienVaKeHoachDuKienTrongKyToi', cascade="all, delete-orphan")



# 7.1. Người làm công tác y tế tại cơ sở lao động:     
class NguoiLamCongTacYTeTaiCoSoLaoDong(CommonModel):
    __tablename__ = 'nguoilamcongtacytetaicosolaodong'
    id = db.Column(UUID(as_uuid=True), primary_key=True, default=default_uuid)
    hovaten = db.Column(String(255))
    trinhdochuyenmon = db.Column(String(255))
    sodienthoailienhe = db.Column(String(255))
    chungchiyte = db.Column(String(255))
    baocaoytelaodongcuacosolaodong_id = db.Column(UUID(as_uuid=True), ForeignKey('baocaoytelaodongcuacosolaodong.id'), nullable=True)



# 9. Công tác thanh tra, kiểm tra việc thực hiện công tác vệ sinh lao động, chăm sóc sức khỏe người lao động, phòng chống bệnh nghề nghiệp trong kỳ báo cáo (của các cơ quan chức năng đối với cơ sở lao động)
class CongTacThanhTra(CommonModel):
    __tablename__ = 'congtacthanhtra'
    id = db.Column(UUID(as_uuid=True), primary_key=True, default=default_uuid)
    ngaykiemtra = db.Column(db.DateTime())
    donvikiemtra = db.Column(String(255))
    noidungkiemtra = db.Column(String(255))
    ghichu = db.Column(String(255))
    baocaoytelaodongcuacosolaodong_id = db.Column(UUID(as_uuid=True), ForeignKey('baocaoytelaodongcuacosolaodong.id'), nullable=True)

# II. Điều kiện lao động và số lao động tiếp xúc với yếu tố có hại
class DieuKienLaoDongVaSoLaoDongTiepXucYeuToCoHai(CommonModel):
    __tablename__ = 'dieukienlaodongvasolaodongtiepxucyeutocohai'
    id = db.Column(UUID(as_uuid=True), primary_key=True, default=default_uuid)
    yeutoquantrac = db.Column(String(255))
    tongsomau = db.Column(db.Integer)
    somaukhongdat = db.Column(db.Integer)
    tongsolaodongtiepxu = db.Column(db.Integer)
    sonulaodongtiepxuc = db.Column(db.Integer)
    tongsomausilic = db.Column(db.Integer)
    tongsomaukhac = db.Column(db.Integer)
    tongsomaukhongdatsilic = db.Column(db.Integer)
    tongsomaukhongdatkhac = db.Column(db.Integer)
    baocaoytelaodongcuacosolaodong_id = db.Column(UUID(as_uuid=True), ForeignKey('baocaoytelaodongcuacosolaodong.id'), nullable=True)
# III. Nghỉ việc do ốm đau, tai nạn lao động và bệnh nghề nghiệp
class NghiViecDoOmDauTaiNanLaoDongVaBenhNgheNghiep(CommonModel):
    __tablename__ = 'nghiviecdoomdautainanlaodongvabenhnghenghiep'
    id = db.Column(UUID(as_uuid=True), primary_key=True, default=default_uuid)
    thang = db.Column(db.Integer)
    songuoiom = db.Column(String(255))
    songaynghiom = db.Column(String(255)) 
    songuoitainanlaodong = db.Column(String(255))
    songaynghitainanlaodong = db.Column(String(255))
    songuoinghibenhnghenghiep = db.Column(String(255))
    songaynghibenhnghenghiep = db.Column(String(255))
    baocaoytelaodongcuacosolaodong_id = db.Column(UUID(as_uuid=True), ForeignKey('baocaoytelaodongcuacosolaodong.id'), nullable=True)


# IV. Bệnh nghề nghiệp được bảo hiểm
# 1. Tổng hợp tình hình bệnh nghề nghiệp tại cơ sở lao động
class TinhHinhBenhNgheNghiepTaiCoSo(CommonModel):
    __tablename__ = 'tinhhinhbenhnghenghieptaicoso'
    id = db.Column(UUID(as_uuid=True), primary_key=True, default=default_uuid)
    tenbenhnghenghiep = db.Column(String(255))
    nldduockhamsuckhoephathienbnn = db.Column(String(255))
    nldnuduockhamsuckhoephathienbnn = db.Column(String(255))
    nldduocchuandoanbnn = db.Column(String(255))
    nldnuduocchuandoanbnn = db.Column(String(255))
    nldduocgiamdinhbnn = db.Column(String(255))
    nldnuduocgiamdinhbnn = db.Column(String(255))
    tongsoketquagiamdinhbnnnhohon5phantram = db.Column(String(255))
    sonuketquagiamdinhbnnnhohon5phantram = db.Column(String(255))
    tongsoketquagiamdinhbnnlonhon5nhohon30phantram = db.Column(String(255))
    sonuketquagiamdinhbnnlonhon5nhohon30phantram = db.Column(String(255))
    tongsoketquagiamdinhbnnlonhon31phantram = db.Column(String(255))
    sonuketquagiamdinhbnnlonhon31phantram = db.Column(String(255))
    baocaoytelaodongcuacosolaodong_id = db.Column(UUID(as_uuid=True), ForeignKey('baocaoytelaodongcuacosolaodong.id'), nullable=True)


# 2. Danh sách trường hợp bệnh nghề nghiệp
class DanhSachTruongHopBenhNgheNghiep(CommonModel):
    __tablename__ = 'danhsachtruonghopbenhnghenghiep'
    id = db.Column(UUID(as_uuid=True), primary_key=True, default=default_uuid)
    Hotenbenhnhan = db.Column(String(255))
    tuoinam = db.Column(db.Integer)
    tuoinu = db.Column(db.Integer)
    nghekhibibnn = db.Column(String(255))
    tuoinghe = db.Column(db.Integer)
    ngayphathienbenh = db.Column(db.DateTime())
    tenbnn = db.Column(String(255))
    tylesuygiamkhananglaodong = db.Column(String(255))
    congviechiennay = db.Column(String(255))
    baocaoytelaodongcuacosolaodong_id = db.Column(UUID(as_uuid=True), ForeignKey('baocaoytelaodongcuacosolaodong.id'), nullable=True)

    
# V. Tình hình bệnh tật và tai nạn lao động
# 1. Thống kê tổng số trường hợp mắc các loại bệnh thông thường:
class ThongKeTongSoTruongHopMacCacLoaiBenhThongThuong(CommonModel):
    __tablename__ = 'thongketongsotruonghopmaccacloaibenhthongthuong'
    id = db.Column(UUID(as_uuid=True), primary_key=True, default=default_uuid)
    nhombenh = db.Column(String(255))
    sotruonghopquy1 = db.Column(String(255))
    sotruonghopquy2 = db.Column(String(255))
    sotruonghopquy3 = db.Column(String(255))
    sotruonghopquy4 = db.Column(String(255))
    baocaoytelaodongcuacosolaodong_id = db.Column(UUID(as_uuid=True), ForeignKey('baocaoytelaodongcuacosolaodong.id'), nullable=True)
# 2. Các trường hợp mắc bệnh nghề nghiệp
class CacTruongHopMacBenhNgheNghiep(CommonModel):
    __tablename__ = 'cactruonghopmacbenhnghenghiep'
    id = db.Column(UUID(as_uuid=True), primary_key=True, default=default_uuid)
    benhnghenghiep = db.Column(String(255))
    sotruonghopquy1 = db.Column(String(255))
    sotruonghopquy2 = db.Column(String(255))
    sotruonghopquy3 = db.Column(String(255))
    sotruonghopquy4 = db.Column(String(255))
    baocaoytelaodongcuacosolaodong_id = db.Column(UUID(as_uuid=True), ForeignKey('baocaoytelaodongcuacosolaodong.id'), nullable=True)


# 3. Các trường hợp tai nạn lao động
class CacTruongHopTaiNanLaoDong(CommonModel):
    __tablename__ = 'cactruonghoptainanlaodong'
    id = db.Column(UUID(as_uuid=True), primary_key=True, default=default_uuid)
    tainanlaodong = db.Column(String(255))
    sotruonghopquy1mac = db.Column(String(255))
    sotruonghopquy1chet = db.Column(String(255))
    sotruonghopquy2mac = db.Column(String(255))
    sotruonghopquy2chet = db.Column(String(255))
    sotruonghopquy3mac = db.Column(String(255))
    sotruonghopquy3chet = db.Column(String(255))
    sotruonghopquy4mac = db.Column(String(255))
    sotruonghopquy4chet = db.Column(String(255))
    baocaoytelaodongcuacosolaodong_id = db.Column(UUID(as_uuid=True), ForeignKey('baocaoytelaodongcuacosolaodong.id'), nullable=True)



# VII. Công tác huấn luyện
class CongTacHuanLuyen(CommonModel):
    __tablename__ = 'congtachuanluyen'
    id = db.Column(UUID(as_uuid=True), primary_key=True, default=default_uuid)
    noidunghuanluyen = db.Column(String(255))
    tongsonguoiduochuanluyen = db.Column(String(255))
    tongsonuduochuanluyen = db.Column(String(255))
    baocaoytelaodongcuacosolaodong_id = db.Column(UUID(as_uuid=True), ForeignKey('baocaoytelaodongcuacosolaodong.id'), nullable=True)



# VIII. Kinh phí chi trả cho công tác vệ sinh lao động, chăm sóc sức khỏe người lao động
class KinhPhiVeSinhLaoDongVaChamSocSucKhoeNguoiLaoDong(CommonModel):
    __tablename__ = 'kinhphivesinhlaodongvachamsocsuckhoenguoilaodong'
    id = db.Column(UUID(as_uuid=True), primary_key=True, default=default_uuid)
    noidunghoatdong = db.Column(String(255))
    sotienkhamsuckhoedinhky = db.Column(String(255))
    ghichukhamsuckhoedinhky = db.Column(String(255))
    baocaoytelaodongcuacosolaodong_id = db.Column(UUID(as_uuid=True), ForeignKey('baocaoytelaodongcuacosolaodong.id'), nullable=True)

# IX. Các kiến nghị và kế hoạch dự kiến trong kỳ báo cáo tớ
class CacKienNghiDuKienVaKeHoachDuKienTrongKyToi(CommonModel):
    __tablename__ = 'cackiennghidukienvakehoachdukientrongkytoi'
    id = db.Column(UUID(as_uuid=True), primary_key=True, default=default_uuid)
    noidung = db.Column(String(255))
    baocaoytelaodongcuacosolaodong_id = db.Column(UUID(as_uuid=True), ForeignKey('baocaoytelaodongcuacosolaodong.id'), nullable=True)

# Hết Báo cáo 1 Phụ lục 8

###########################################################################################

# Báo cáo 1 Phụ lục 9
class BaoCaoHoatDongYTeLaoDong6ThangNamTuyenHuyen(CommonModel):
    __tablename__ = 'baocaohoatdongytelaodong6thangnamtuyenhuyen'
    id = db.Column(UUID(as_uuid=True), primary_key=True, default=default_uuid)
    soyte = db.Column(String(255))
    trungtamyte = db.Column(String(255))
    so = db.Column(db.Integer)
    bc = db.Column(db.Integer)
    noivietbaocao = db.Column(String(255))
    ngayvietbaocao = db.Column(db.Integer)
    thangvietbaocao = db.Column(db.Integer)
    namvietbaocao= db.Column(db.Integer)
    baocaonam = db.Column(db.Integer)
#CƠ SỞ LAO ĐỘNG TRONG PHẠM VI QUẢN LÝ
    loaicosolaodongtren200nld = db.Column(String(255))
    tongsocotren200nld = db.Column(db.Integer)
    sotructhuocbonganhtren200nld = db.Column(db.Integer)
    socosocoyeutocohainguyhiemtren200nld = db.Column(db.Integer)
    songuoilaodongtaitatcacosotren200nld = db.Column(db.Integer)
    songuoilaodongnutaitatcacosotren200nld = db.Column(db.Integer)
    songuoilaodongtaitatcacosocoyeutocohaitren200nld = db.Column(db.Integer)
    songuoilaodongnutaitatcacosocoyeutocohaitren200nld = db.Column(db.Integer)
    songuoilaodongtaitatcacosotiepxuctructieptren200nld = db.Column(db.Integer)
    songuoilaodongnutaitatcacosotiepxuctructieptren200nld = db.Column(db.Integer)
    
    loaicosolaodongtren50duoi200ndl = db.Column(String(255))
    tongsocotren50duoi200ndl = db.Column(db.Integer)
    sotructhuocbonganhtren50duoi200ndl = db.Column(db.Integer)
    socosocoyeutocohainguyhiemtren50duoi200ndl = db.Column(db.Integer)
    songuoilaodongtaitatcacosotren50duoi200ndl = db.Column(db.Integer)
    songuoilaodongnutaitatcacosotren50duoi200ndl = db.Column(db.Integer)
    songuoilaodongtaitatcacosocoyeutocohaitren50duoi200ndl = db.Column(db.Integer)
    songuoilaodongnutaitatcacosocoyeutocohaitren50duoi200ndl = db.Column(db.Integer)
    songuoilaodongtaitatcacosotiepxuctructieptren50duoi200ndl = db.Column(db.Integer)
    songuoilaodongnutaitatcacosotiepxuctructieptren50duoi200ndl = db.Column(db.Integer)
    
    loaicosolaodongduoi50nld = db.Column(String(255))
    tongsocoduoi50nld = db.Column(db.Integer)
    sotructhuocbonganhduoi50nld = db.Column(db.Integer)
    socosocoyeutocohainguyhiemduoi50nld = db.Column(db.Integer)
    songuoilaodongtaitatcacosoduoi50nld = db.Column(db.Integer)
    songuoilaodongnutaitatcacosoduoi50nld = db.Column(db.Integer)
    songuoilaodongtaitatcacosocoyeutocohaiduoi50nld = db.Column(db.Integer)
    songuoilaodongnutaitatcacosocoyeutocohaiduoi50nld = db.Column(db.Integer)
    songuoilaodongtaitatcacosotiepxuctructiepduoi50nld = db.Column(db.Integer)
    songuoilaodongnutaitatcacosotiepxuctructiepduoi50nld = db.Column(db.Integer)
# III LẬP HỒ SƠ VỆ SINH LAO ĐỘNG
    tongsocosothuocphamviquanly = db.Column(db.Integer)
    socosolaphosovesinhlaodongthuocphamviquanly = db.Column(db.Integer)
    tongsocosocoyeutocohai = db.Column(db.Integer)
    socosolaphosovesinhlaodongcoyeutocohai = db.Column(db.Integer)
# IV. TỔ CHỨC BỘ PHẬN Y TẾ TẠI CƠ SỞ LAO ĐỘNG

# 1. Phân loại cơ sở lao động theo hình thức tổ chức bộ phận y tế  
    loaicososanxuattren50duoi200ndl = db.Column(db.Integer)
    hinhthuccotramytetren50duoi200ndl = db.Column(db.Integer)
    hinhthuccobenhvientren50duoi200ndl = db.Column(db.Integer)
    hinhthuccophongkhamtren50duoi200ndl = db.Column(db.Integer)
    hinhthuckhactren50duoi200ndl = db.Column(db.Integer)
    hopdongvoicosokhambenhtren50duoi200ndl = db.Column(db.Integer)

    loaicososanxuattren200nld = db.Column(db.Integer)
    hinhthuccotramytetren200nld = db.Column(db.Integer)
    hinhthuccobenhvientren200nld = db.Column(db.Integer)
    hinhthuccophongkhamtren200nld = db.Column(db.Integer)
    hinhthuckhactren200nld = db.Column(db.Integer)
    hopdongvoicosokhambenhtren200nld = db.Column(db.Integer)
    
    loaicososanxuatduoi50nld = db.Column(db.Integer)
    hinhthuccotramyteduoi50nld = db.Column(db.Integer)
    hinhthuccobenhvienduoi50nld = db.Column(db.Integer)
    hinhthuccophongkhamduoi50nld = db.Column(db.Integer)
    hinhthuckhacduoi50nld = db.Column(db.Integer)
    hopdongvoicosokhambenhduoi50nld = db.Column(db.Integer)

# 2. Trình độ người làm công tác Y tế tại các cơ sở lao động    
    songuoilamcongtacytetren50duoi200ndl = db.Column(db.Integer)
    trinhdobacsitren50duoi200ndl = db.Column(db.Integer)
    trinhdobacsiduphongtren50duoi200ndl = db.Column(db.Integer)
    trinhdocunhantren50duoi200ndl = db.Column(db.Integer)
    trinhdoysytren50duoi200ndl = db.Column(db.Integer)
    trinhdodieuduongtren50duoi200ndl = db.Column(db.Integer)
    trinhdohosinhvientren50duoi200ndl = db.Column(db.Integer)

    songuoilamcongtacytetren200nld = db.Column(db.Integer)
    trinhdobacsitren200nld = db.Column(db.Integer)
    trinhdobacsiduphongtren200nld = db.Column(db.Integer)
    trinhdocunhantren200nld = db.Column(db.Integer)
    trinhdoysytren200nld = db.Column(db.Integer)
    trinhdodieuduongtren200nld = db.Column(db.Integer)
    trinhdohosinhvientren200nld = db.Column(db.Integer)

    songuoilamcongtacyteduoi50nld = db.Column(db.Integer)
    trinhdobacsiduoi50nld = db.Column(db.Integer)
    trinhdobacsiduphongduoi50nld = db.Column(db.Integer)
    trinhdocunhanduoi50nld = db.Column(db.Integer)
    trinhdoysyduoi50nld = db.Column(db.Integer)
    trinhdodieuduongduoi50nld = db.Column(db.Integer)
    trinhdohosinhvienduoi50nld = db.Column(db.Integer)

# 3. Lực lượng sơ cấp cứu tại các cơ sở lao động
    tongsonguoithamgiasocuutren50duoi200ndl = db.Column(db.Integer)
    tongsonguoinuthamgiasocuutren50duoi200ndl = db.Column(db.Integer)
    
    tongsonguoithamgiasocuutren200nld = db.Column(db.Integer)
    tongsonguoinuthamgiasocuutren200nld = db.Column(db.Integer)
    

    tongsonguoithamgiasocuuduoi50nld = db.Column(db.Integer)
    tongsonguoinuthamgiasocuuduoi50nld = db.Column(db.Integer)
# VI. TÌNH HÌNH KHÁM ĐỊNH KỲ VÀ KHÁM PHÁT HIỆN, GIÁM ĐỊNH BỆNH NGHỀ NGHIỆP
# 1. Phân loại sức khỏe:
    loai1nam = db.Column(String(255))
    loai2nam = db.Column(String(255))
    loai3nam = db.Column(String(255))
    loai4nam = db.Column(String(255))
    loai5nam = db.Column(String(255))
    loai1nu = db.Column(String(255))
    loai2nu = db.Column(String(255))
    loai3nu = db.Column(String(255))
    loai4nu = db.Column(String(255))
    loai5nu = db.Column(String(255))
# VIII. BÁO CÁO CÁC TRƯỜNG HỢP TAI NẠN LAO ĐỘNG ĐƯỢC KHÁM, ĐIỀU TRỊ TẠI CƠ SỞ KHÁM BỆNH, CHỮA BỆNH (KBCB)    
# 2. Tổng hợp các trường hợp tai nạn lao động
    songuoilaodongduocsocuucapcuu = db.Column(db.Integer())
    songuoilaodongduocdieutrilandautrongnam = db.Column(db.Integer())
    songuoibitainanlaodongdencosokhambenh = db.Column(db.Integer())
    # X. CÁC HOẠT ĐỘNG VỀ Y TẾ LAO ĐỘNG CỦA ĐƠN VỊ 
    # 3. Tổ chức giao ban với tuyến dưới
    socosolaodongthamgiagiaoban = db.Column(db.Integer())
    sotramytethamgiagiaoban = db.Column(db.Integer())
    noidunggiaobancosolaodong = db.Column(String(255))
    noidunggiaobantramyte = db.Column(String(255))
    dexuatcosolaodong = db.Column(String(255))
    dexuattramyte = db.Column(String(255))
    # 4. Công tác thanh tra, kiểm tra việc thực hiện công tác vệ sinh lao động, chăm sóc sức khỏe người lao động, phòng chống bệnh nghề nghiệp trong kỳ báo cáo 
    tongsocosolaodongduocthanhtra = db.Column(db.Integer())
    socosolaodongcoyeutocohaiduocthanhtra = db.Column(db.Integer())
    ghichu = db.Column(String(255))

    # XI. ĐÁNH GIÁ VÀ KIẾN NGHỊ
    # 1. Đánh giá về tình hình thực hiện công tác VSLĐ, PCBNN trên địa bàn
    danhgia = db.Column(String(255))
    # 2. Kiến nghị
    kienghi = db.Column(String(255))
    
    ########
    ##   
    ##	
    ########
    ##
    ##
    ##
    phanloaicosolaodongtheonganhnghevaquymofield = db.relationship('PhanLoaiCoSoLaoDongTheoNganhNgheVaQuyMo', cascade="all, delete-orphan")
    phanloaicosolaodongcoyeutocohainguyhiemfield = db.relationship('PhanLoaiCoSoLaoDongCoYeuToCoHaiNguyHiem', cascade="all, delete-orphan")
    ketquaquantraccacyeutovikhihauvavatlyhoahocfield = db.relationship('KetQuaQuanTracCacYeuToViKhiHauVaVatLyHoaHoc', cascade="all, delete-orphan")
    ketquaquantraccacyeutobuitrongmoitruonglaodongfield = db.relationship('KetQuaQuanTracCacYeuToBuiTrongMoiTruongLaoDong', cascade="all, delete-orphan")
    ketquadanhgiacacyeutotiepxucnghenghiepfield = db.relationship('KetQuaDanhGiaCacYeuToTiepXucNgheNghiep', cascade="all, delete-orphan")
    tinhhinhnghiomfield = db.relationship('TinhHinhNghiOm', cascade="all, delete-orphan")
    tongsotruonghopmaccacloaibenhthongthuongfield = db.relationship('TongSoTruongHopMacCacLoaiBenhThongThuong', cascade="all, delete-orphan")
    cactruonghopmacbenhnghenghiepphuluc9field = db.relationship('CacTruongHopMacBenhNgheNghiepPhuLuc9', cascade="all, delete-orphan")
    cactruonghoptainanlaodongphuluc9field = db.relationship('CacTruongHopTaiNanLaoDongPhuLuc9', cascade="all, delete-orphan")
    ketquakhamphathienbenhnghenghiepfield = db.relationship('KetQuaKhamPhatHienBenhNgheNghiep', cascade="all, delete-orphan")
    danhsachnguoimacbenhnghenghiepfield = db.relationship('DanhSachNguoiMacBenhNgheNghiep', cascade="all, delete-orphan")
    tonghoptubaocaocuacaccosolaodongfield = db.relationship('TongHopTuBaoCaoCuaCacCoSoLaoDong', cascade="all, delete-orphan")
    cachoatdongdodonvitrienkhaifield = db.relationship('CacHoatDongDoDonViTrienKhai', cascade="all, delete-orphan")
    danhsachcactruonghoptainanlaodongfield = db.relationship('DanhSachCacTruongHopTaiNanLaoDong', cascade="all, delete-orphan")
    phanloaicactruonghoptainanlaodongtheoviecsocuufield = db.relationship('PhanLoaiCacTruongHopTaiNanLaoDongTheoViecSoCuu', cascade="all, delete-orphan")
    phanloaicactruonghoptainanlaodongtheonganhnghefield = db.relationship('PhanLoaiCacTruongHopTaiNanLaoDongTheoNganhNghe', cascade="all, delete-orphan")
    kinhphichitrafield = db.relationship('KinhPhiChiTra', cascade="all, delete-orphan")



#II. PHÂN LOẠI CƠ SỞ LAO ĐỘNG THEO NGÀNH NGHỀ VÀ QUY MÔ
class PhanLoaiCoSoLaoDongTheoNganhNgheVaQuyMo(CommonModel):
    __tablename__ = 'phanloaicosolaodongtheonganhnghevaquymo'
    id = db.Column(UUID(as_uuid=True), primary_key=True, default=default_uuid)
    loainganhnghe = db.Column(String(255))
    socsconho = db.Column(db.Integer)
    sonldcosoconho = db.Column(db.Integer)
    socscovua = db.Column(db.Integer)
    sonldcosocovua = db.Column(db.Integer)
    socscolon= db.Column(db.Integer)
    sonldcosocolon = db.Column(db.Integer)
    baocaohoatdongytelaodong6thangnamtuyenhuyen_id = db.Column(UUID(as_uuid=True), ForeignKey('baocaohoatdongytelaodong6thangnamtuyenhuyen.id'), nullable=True)
class PhanLoaiCoSoLaoDongCoYeuToCoHaiNguyHiem(CommonModel):
    __tablename__ = 'phanloaicosolaodongcoyeutocohainguyhiem'
    id = db.Column(UUID(as_uuid=True), primary_key=True, default=default_uuid)
    loainganhnghe = db.Column(String(255))
    socsconho = db.Column(db.Integer)
    sonldcosoconho = db.Column(db.Integer)
    socscovua = db.Column(db.Integer)
    sonldcosocovua = db.Column(db.Integer)
    socscolon= db.Column(db.Integer)
    sonldcosocolon = db.Column(db.Integer)
    baocaohoatdongytelaodong6thangnamtuyenhuyen_id = db.Column(UUID(as_uuid=True), ForeignKey('baocaohoatdongytelaodong6thangnamtuyenhuyen.id'), nullable=True)



# V. KẾT QUẢ QUAN TRẮC MÔI TRƯỜNG LAO ĐỘNG TRONG KỲ BÁO CÁO
# 1. Kết quả quan trắc các yếu tố vi khí hậu và vật lý, hóa học trong môi trường lao động
class KetQuaQuanTracCacYeuToViKhiHauVaVatLyHoaHoc(CommonModel):
    __tablename__ = 'ketquaquantraccacyeutovikhihauvavatlyhoahoc'
    id = db.Column(UUID(as_uuid=True), primary_key=True, default=default_uuid)
    tencoso = db.Column(String(255))
    tongsonguoilaodong = db.Column(db.Integer)
    songuoitiepxuc = db.Column(db.Integer)
    nhietdo1 = db.Column(db.Integer)
    nhietdo2 = db.Column(db.Integer)
    doam1 = db.Column(db.Integer)
    doam2= db.Column(db.Integer)
    tocdogio1 = db.Column(db.Integer)
    tocdogio2= db.Column(db.Integer)
    anhsang1 = db.Column(db.Integer)
    anhsang2= db.Column(db.Integer)
    on1 = db.Column(db.Integer)
    on2= db.Column(db.Integer)
    rung1 = db.Column(db.Integer)
    rung2= db.Column(db.Integer)
    hkdoc1 = db.Column(db.Integer)
    hkdoc2= db.Column(db.Integer)
    phongxa1 = db.Column(db.Integer)
    phongxa2= db.Column(db.Integer)
    dientutruong1 = db.Column(db.Integer)
    dientutruong2= db.Column(db.Integer)
    yeutokhac1 = db.Column(db.Integer)
    yeutokhac2= db.Column(db.Integer)
    baocaohoatdongytelaodong6thangnamtuyenhuyen_id = db.Column(UUID(as_uuid=True), ForeignKey('baocaohoatdongytelaodong6thangnamtuyenhuyen.id'), nullable=True)
# 2. Kết quả quan trắc yếu tố bụi trong môi trường lao động
class KetQuaQuanTracCacYeuToBuiTrongMoiTruongLaoDong(CommonModel):
    __tablename__ = 'ketquaquantraccacyeutobuitrongmoitruonglaodong'
    id = db.Column(UUID(as_uuid=True), primary_key=True, default=default_uuid)
    tencoso = db.Column(String(255))
    tongsonguoilaodong = db.Column(db.Integer)
    songuoitiepxucvoicacyeutobui = db.Column(db.Integer)
    buitoanphan1 = db.Column(db.Integer)
    buitoanphan2 = db.Column(db.Integer)
    buihohap1 = db.Column(db.Integer)
    buihohap2= db.Column(db.Integer)
    buisilic1 = db.Column(db.Integer)
    buisilic2= db.Column(db.Integer)
    buikhac1 = db.Column(db.Integer)
    buikhac2= db.Column(db.Integer)
    baocaohoatdongytelaodong6thangnamtuyenhuyen_id = db.Column(UUID(as_uuid=True), ForeignKey('baocaohoatdongytelaodong6thangnamtuyenhuyen.id'), nullable=True)
# 3. Kết quả đánh giá các yếu tố tiếp xúc nghề nghiệp và yếu tố tâm sinh lý và ec-gô-nô-my
class KetQuaDanhGiaCacYeuToTiepXucNgheNghiep(CommonModel):
    __tablename__ = 'ketquadanhgiacacyeutotiepxucnghenghiep'
    id = db.Column(UUID(as_uuid=True), primary_key=True, default=default_uuid)
    tencoso = db.Column(String(255))
    tongsonguoilaodong = db.Column(db.Integer)
    yeutotiepxuc = db.Column(db.Integer)
    songuoitiepxuc = db.Column(db.Integer)
    ketquadanhgia = db.Column(db.Integer)
    songuoiduocdanhgiaecgonomy = db.Column(db.Integer)
    ketquadanhgiaecgonomy= db.Column(db.Integer)
    baocaohoatdongytelaodong6thangnamtuyenhuyen_id = db.Column(UUID(as_uuid=True), ForeignKey('baocaohoatdongytelaodong6thangnamtuyenhuyen.id'), nullable=True)
#VI. TÌNH HÌNH SỨC KHỎE VÀ BỆNH TẬT 
# 1. Tình hình nghỉ ốm
class TinhHinhNghiOm(CommonModel):
    __tablename__ = 'tinhhinhnghiom'
    id = db.Column(UUID(as_uuid=True), primary_key=True, default=default_uuid)
    tencoso = db.Column(String(255))
    songuoiom = db.Column(db.Integer)
    songayom = db.Column(db.Integer)
    songuoitainanlaodong = db.Column(db.Integer)
    songaytainanlaodong = db.Column(db.Integer)
    songuoibenhnghenghiep = db.Column(db.Integer)
    songaybenhnghenghiep= db.Column(db.Integer)
    baocaohoatdongytelaodong6thangnamtuyenhuyen_id = db.Column(UUID(as_uuid=True), ForeignKey('baocaohoatdongytelaodong6thangnamtuyenhuyen.id'), nullable=True)
# 2. Tình hình bệnh tật và tai nạn lao động
# 2.1.  Tổng số trường hợp mắc các loại bệnh thông thường:
class TongSoTruongHopMacCacLoaiBenhThongThuong(CommonModel):
    __tablename__ = 'tongsotruonghopmaccacloaibenhthongthuong'
    id = db.Column(UUID(as_uuid=True), primary_key=True, default=default_uuid)
    nhombenh = db.Column(String(255))
    sotruonghopquy1 = db.Column(String(255))
    sotruonghopquy2 = db.Column(String(255))
    sotruonghopquy3 = db.Column(String(255))
    sotruonghopquy4 = db.Column(String(255))
    baocaohoatdongytelaodong6thangnamtuyenhuyen_id = db.Column(UUID(as_uuid=True), ForeignKey('baocaohoatdongytelaodong6thangnamtuyenhuyen.id'), nullable=True)
# 2. Các trường hợp mắc bệnh nghề nghiệp
class CacTruongHopMacBenhNgheNghiepPhuLuc9(CommonModel):
    __tablename__ = 'cactruonghopmacbenhnghenghiepphuluc9'
    id = db.Column(UUID(as_uuid=True), primary_key=True, default=default_uuid)
    benhnghenghiep = db.Column(String(255))
    sotruonghopquy1 = db.Column(String(255))
    sotruonghopquy2 = db.Column(String(255))
    sotruonghopquy3 = db.Column(String(255))
    sotruonghopquy4 = db.Column(String(255))
    baocaohoatdongytelaodong6thangnamtuyenhuyen_id = db.Column(UUID(as_uuid=True), ForeignKey('baocaohoatdongytelaodong6thangnamtuyenhuyen.id'), nullable=True)

# 3. Các trường hợp tai nạn lao động
class CacTruongHopTaiNanLaoDongPhuLuc9(CommonModel):
    __tablename__ = 'cactruonghoptainanlaodongphuluc9'
    id = db.Column(UUID(as_uuid=True), primary_key=True, default=default_uuid)
    tainanlaodong = db.Column(String(255))
    sotruonghopquy1mac = db.Column(String(255))
    sotruonghopquy1chet = db.Column(String(255))
    sotruonghopquy2mac = db.Column(String(255))
    sotruonghopquy2chet = db.Column(String(255))
    sotruonghopquy3mac = db.Column(String(255))
    sotruonghopquy3chet = db.Column(String(255))
    sotruonghopquy4mac = db.Column(String(255))
    sotruonghopquy4chet = db.Column(String(255))
    baocaohoatdongytelaodong6thangnamtuyenhuyen_id = db.Column(UUID(as_uuid=True), ForeignKey('baocaohoatdongytelaodong6thangnamtuyenhuyen.id'), nullable=True)
# VI. TÌNH HÌNH KHÁM ĐỊNH KỲ VÀ KHÁM PHÁT HIỆN, GIÁM ĐỊNH BỆNH NGHỀ NGHIỆP
# 2. Kết quả khám phát hiện bệnh nghề nghiệp
class KetQuaKhamPhatHienBenhNgheNghiep(CommonModel):
    __tablename__ = 'ketquakhamphathienbenhnghenghiep'
    id = db.Column(UUID(as_uuid=True), primary_key=True, default=default_uuid)
    tenbenhnghenghiep = db.Column(String(255))
    tongsonldduockhamsuckhoephathienbnn = db.Column(db.Integer())
    tongsonldnuduockhamsuckhoephathienbnn = db.Column(db.Integer())
    tongsondlduocchuandoanbnn = db.Column(db.Integer())
    tongsondlnuduocchuandoanbnn = db.Column(db.Integer())
    tongsonldduocgiamdinhbnn = db.Column(db.Integer())
    tongsonldnuduocgiamdinhbnn = db.Column(db.Integer())
    tongsogiamdinhnhohon5phantram = db.Column(db.Integer())
    tongsogiamdinhnhohon5phantramnu = db.Column(db.Integer())
    tongsogiamdinhlonhon31phantram = db.Column(db.Integer())
    tongsogiamdinhlonhon31phantramnu = db.Column(db.Integer())
    tongsogiamdinhlonhon5nhohon31phantram= db.Column(db.Integer())
    tongsogiamdinhlonhon5nhohon31phantramnu = db.Column(db.Integer())
    baocaohoatdongytelaodong6thangnamtuyenhuyen_id = db.Column(UUID(as_uuid=True), ForeignKey('baocaohoatdongytelaodong6thangnamtuyenhuyen.id'), nullable=True)
# 3. Danh sách người mắc bệnh nghề nghiệp
class DanhSachNguoiMacBenhNgheNghiep(CommonModel):
    __tablename__ = 'danhsachnguoimacbenhnghenghiep'
    id = db.Column(UUID(as_uuid=True), primary_key=True, default=default_uuid)
    hotenbenhnhan = db.Column(String(255))
    tuoinam = db.Column(db.Integer())
    tuoinu = db.Column(db.Integer())
    nghekhibibnn = db.Column(String(255))
    tuoinghe = db.Column(String(255))
    ngayphathienbenh = db.Column(db.DateTime())
    tenbnn = db.Column(String(255))
    tylesuygiamknld = db.Column(String(255))
    congviechiennay = db.Column(String(255))
    baocaohoatdongytelaodong6thangnamtuyenhuyen_id = db.Column(UUID(as_uuid=True), ForeignKey('baocaohoatdongytelaodong6thangnamtuyenhuyen.id'), nullable=True)
# VII. HUẤN LUYỆN VỀ Y TẾ LAO ĐỘNG VÀ BỆNH NGHỀ NGHIỆP    
class TongHopTuBaoCaoCuaCacCoSoLaoDong(CommonModel):
    __tablename__ = 'tonghoptubaocaocuacaccosolaodong'
    id = db.Column(UUID(as_uuid=True), primary_key=True, default=default_uuid)
    noidung = db.Column(String(255))
    socosolaodongduochuanluyen = db.Column(db.Integer())
    tongso = db.Column(db.Integer())
    sonu = db.Column(db.Integer())
    baocaohoatdongytelaodong6thangnamtuyenhuyen_id = db.Column(UUID(as_uuid=True), ForeignKey('baocaohoatdongytelaodong6thangnamtuyenhuyen.id'), nullable=True)
class CacHoatDongDoDonViTrienKhai(CommonModel):
    __tablename__ = 'cachoatdongdodonvitrienkhai'
    id = db.Column(UUID(as_uuid=True), primary_key=True, default=default_uuid)
    noidung = db.Column(String(255))
    socosolaodongduochuanluyen = db.Column(db.Integer())
    tongso = db.Column(db.Integer())
    sonu = db.Column(db.Integer())
    baocaohoatdongytelaodong6thangnamtuyenhuyen_id = db.Column(UUID(as_uuid=True), ForeignKey('baocaohoatdongytelaodong6thangnamtuyenhuyen.id'), nullable=True)
# VIII. BÁO CÁO CÁC TRƯỜNG HỢP TAI NẠN LAO ĐỘNG ĐƯỢC KHÁM, ĐIỀU TRỊ TẠI CƠ SỞ KHÁM BỆNH, CHỮA BỆNH (KBCB)    
# 1. Danh sách các trường hợp tai nạn lao động
class DanhSachCacTruongHopTaiNanLaoDong(CommonModel):
    __tablename__ = 'danhsachcactruonghoptainanlaodong'
    id = db.Column(UUID(as_uuid=True), primary_key=True, default=default_uuid)
    hovaten = db.Column(String(255))
    tuoi = db.Column(db.Integer())
    nam = db.Column(db.Integer())
    nu = db.Column(db.Integer())
    ngaybitainan = db.Column(db.DateTime())
    nghenghiep = db.Column(String(255))
    bophanbitonthuong = db.Column(String(255))
    duocsocuutaicho = db.Column(db.Integer())
    phuongtienchuyendencosokbcb = db.Column(String(255))
    thoigiandieutri = db.Column(db.DateTime())
    ketquadieutri = db.Column(db.Integer())
    ghichu = db.Column(String(255))
    baocaohoatdongytelaodong6thangnamtuyenhuyen_id = db.Column(UUID(as_uuid=True), ForeignKey('baocaohoatdongytelaodong6thangnamtuyenhuyen.id'), nullable=True)

#3. Phân loại các trường hợp tai nạn lao động theo việc sơ cứu, cấp cứu và điều trị  
class PhanLoaiCacTruongHopTaiNanLaoDongTheoViecSoCuu(CommonModel):
    __tablename__ = 'phanloaicactruonghoptainanlaodongtheoviecsocuu'
    id = db.Column(UUID(as_uuid=True), primary_key=True, default=default_uuid)
    cosokbcb = db.Column(String(255))
    songuoiduocsocuutaicho = db.Column(db.Integer())
    tongsonguoiduocdieutritaicosokbcb = db.Column(db.Integer())
    tongsonguoiduocdieutrikhoitaicosokbcb = db.Column(db.Integer())
    tongsonguoiduocdieutrikhoidelaidichungtaicosokbcb = db.Column(db.Integer())
    tongsonguoiduocdieutrituvongtaicosokbcb = db.Column(db.Integer())
    ghichu = db.Column(String(255))
    baocaohoatdongytelaodong6thangnamtuyenhuyen_id = db.Column(UUID(as_uuid=True), ForeignKey('baocaohoatdongytelaodong6thangnamtuyenhuyen.id'), nullable=True)
# 4. Phân loại các trường hợp tai nạn lao động theo ngành nghề
class PhanLoaiCacTruongHopTaiNanLaoDongTheoNganhNghe(CommonModel):
    __tablename__ = 'phanloaicactruonghoptainanlaodongtheonganhnghe'
    id = db.Column(UUID(as_uuid=True), primary_key=True, default=default_uuid)
    manganhnghe = db.Column(String(255))
    nganhnghe = db.Column(String(255))
    tongso = db.Column(db.Integer())
    baocaohoatdongytelaodong6thangnamtuyenhuyen_id = db.Column(UUID(as_uuid=True), ForeignKey('baocaohoatdongytelaodong6thangnamtuyenhuyen.id'), nullable=True)
# IX. KINH PHÍ CHI TRẢ CHO CÔNG TÁC VỆ SINH LAO ĐỘNG, CHĂM SÓC SỨC KHỎE NGƯỜI LAO ĐỘNG     
class KinhPhiChiTra(CommonModel):
    __tablename__ = 'kinhphichitra'
    id = db.Column(UUID(as_uuid=True), primary_key=True, default=default_uuid)
    noidung = db.Column(String(255))
    sotien = db.Column(String(255))
    ghichu = db.Column(String(255))
    baocaohoatdongytelaodong6thangnamtuyenhuyen_id = db.Column(UUID(as_uuid=True), ForeignKey('baocaohoatdongytelaodong6thangnamtuyenhuyen.id'), nullable=True)
# Het Báo cáo 1 Phụ lục 9


####################################################################################
####################################################################################
####################################################################################
# Báo cáo 1 Phụ lục 10
class BaoCaoHoatDongYTeLaoDong6ThangNam(CommonModel):
    __tablename__ = 'baocaohoatdongytelaodong6thangnam'
    id = db.Column(UUID(as_uuid=True), primary_key=True, default=default_uuid)
    donvibaocao = db.Column(String(255))
    so = db.Column(String(255))
    bc = db.Column(String(255))
    noivietbaocao = db.Column(String(255))
    ngayvietbaocao = db.Column(String(255))
    thangvietbaocao = db.Column(String(255))
    namvietbaocao = db.Column(String(255))
    baocaonam = db.Column(String(255))

# I. TÌNH HÌNH TỔ CHỨC VÀ THỰC HIỆN CÁC VĂN BẢN PHÁP QUY
# 1. Công tác tổ chức về y tế lao động
# 1.1 Đơn vị tuyến tỉnh được giao thực hiện công tác y tế lao động:
# 1.2. Tổng số cán bộ làm công tác y tế lao động, PCBNN:
    trinhdobacsy = db.Column(db.Integer())
    trinhdoduocsy = db.Column(db.Integer())
    trinhdocunhanytcc = db.Column(db.Integer())
    trinhdocunhanmt = db.Column(db.Integer())
    trinhdocunhanhoasinh = db.Column(db.Integer())
    trinhdoccaodangy = db.Column(db.Integer())
    trinhdocaodangmoitruong = db.Column(db.Integer())
    trinhdocaodanghoasinh = db.Column(db.Integer())
    khac = db.Column(db.Integer())
    giamdinhnghenghiep= db.Column(db.Integer())

# II. CƠ SỞ LAO ĐỘNG TRONG PHẠM VI QUẢN LÝ
    sotructhuocbonganhtren200nld = db.Column(db.Integer)
    socosocoyeutocohainguyhiemtren200nld = db.Column(db.Integer)
    songuoilaodongtaitatcacosotren200nld = db.Column(db.Integer)
    songuoilaodongnutaitatcacosotren200nld = db.Column(db.Integer)
    songuoilaodongtaitatcacosocoyeutocohaitren200nld = db.Column(db.Integer)
    songuoilaodongnutaitatcacosocoyeutocohaitren200nld = db.Column(db.Integer)
    songuoilaodongtaitatcacosotiepxuctructieptren200nld = db.Column(db.Integer)
    songuoilaodongnutaitatcacosotiepxuctructieptren200nld = db.Column(db.Integer)
    
    sotructhuocbonganhtren50duoi200ndl = db.Column(db.Integer)
    socosocoyeutocohainguyhiemtren50duoi200ndl = db.Column(db.Integer)
    songuoilaodongtaitatcacosotren50duoi200ndl = db.Column(db.Integer)
    songuoilaodongnutaitatcacosotren50duoi200ndl = db.Column(db.Integer)
    songuoilaodongtaitatcacosocoyeutocohaitren50duoi200ndl = db.Column(db.Integer)
    songuoilaodongnutaitatcacosocoyeutocohaitren50duoi200ndl = db.Column(db.Integer)
    songuoilaodongtaitatcacosotiepxuctructieptren50duoi200ndl = db.Column(db.Integer)
    songuoilaodongnutaitatcacosotiepxuctructieptren50duoi200ndl = db.Column(db.Integer)
    
    sotructhuocbonganhduoi50nld = db.Column(db.Integer)
    socosocoyeutocohainguyhiemduoi50nld = db.Column(db.Integer)
    songuoilaodongtaitatcacosoduoi50nld = db.Column(db.Integer)
    songuoilaodongnutaitatcacosoduoi50nld = db.Column(db.Integer)
    songuoilaodongtaitatcacosocoyeutocohaiduoi50nld = db.Column(db.Integer)
    songuoilaodongnutaitatcacosocoyeutocohaiduoi50nld = db.Column(db.Integer)
    songuoilaodongtaitatcacosotiepxuctructiepduoi50nld = db.Column(db.Integer)
    songuoilaodongnutaitatcacosotiepxuctructiepduoi50nld = db.Column(db.Integer)

# IV. LẬP HỒ SƠ VỆ SINH LAO ĐỘNG
    tongsocosothuocphamviquanly = db.Column(db.Integer)
    tongsocosothuocphamviquanlylaphoso = db.Column(db.Integer)
    tongsocosocoyeutocohai = db.Column(db.Integer)
    tongsocosocoyeutocohailaphoso = db.Column(db.Integer)
# V. TỔ CHỨC BỘ PHẬN Y TẾ TẠI CƠ SỞ LAO ĐỘNG
# 1. Hình thức tổ chức bộ phận y tế theo loại cơ sở lao động 
    
    hinhthuccotramytetren50duoi200ndl = db.Column(db.Integer)
    hinhthuccobenhvientren50duoi200ndl = db.Column(db.Integer)
    hinhthuccophongkhamtren50duoi200ndl = db.Column(db.Integer)
    hinhthuckhactren50duoi200ndl = db.Column(db.Integer)
    hopdongvoicosokhambenhtren50duoi200ndl = db.Column(db.Integer)

    
    hinhthuccotramytetren200nld = db.Column(db.Integer)
    hinhthuccobenhvientren200nld = db.Column(db.Integer)
    hinhthuccophongkhamtren200nld = db.Column(db.Integer)
    hinhthuckhactren200nld = db.Column(db.Integer)
    hopdongvoicosokhambenhtren200nld = db.Column(db.Integer)
    

    hinhthuccotramyteduoi50nld = db.Column(db.Integer)
    hinhthuccobenhvienduoi50nld = db.Column(db.Integer)
    hinhthuccophongkhamduoi50nld = db.Column(db.Integer)
    hinhthuckhacduoi50nld = db.Column(db.Integer)
    hopdongvoicosokhambenhduoi50nld = db.Column(db.Integer)

# 2. Trình độ người làm công tác y tế tại các cơ sở lao động   
    trinhdobacsitren50duoi200ndl = db.Column(db.Integer)
    trinhdobacsiduphongtren50duoi200ndl = db.Column(db.Integer)
    trinhdocunhantren50duoi200ndl = db.Column(db.Integer)
    trinhdoysytren50duoi200ndl = db.Column(db.Integer)
    trinhdodieuduongtren50duoi200ndl = db.Column(db.Integer)
    trinhdohosinhvientren50duoi200ndl = db.Column(db.Integer)

    trinhdobacsitren200nld = db.Column(db.Integer)
    trinhdobacsiduphongtren200nld = db.Column(db.Integer)
    trinhdocunhantren200nld = db.Column(db.Integer)
    trinhdoysytren200nld = db.Column(db.Integer)
    trinhdodieuduongtren200nld = db.Column(db.Integer)
    trinhdohosinhvientren200nld = db.Column(db.Integer)

    trinhdobacsiduoi50nld = db.Column(db.Integer)
    trinhdobacsiduphongduoi50nld = db.Column(db.Integer)
    trinhdocunhanduoi50nld = db.Column(db.Integer)
    trinhdoysyduoi50nld = db.Column(db.Integer)
    trinhdodieuduongduoi50nld = db.Column(db.Integer)
    trinhdohosinhvienduoi50nld = db.Column(db.Integer)

# 3. Lực lượng sơ cứu, cấp cứu tại các cơ sở sản xuất, kinh doanh
    tongsonguoithamgiasocuutren50duoi200ndl = db.Column(db.Integer)
    tongsonguoinuthamgiasocuutren50duoi200ndl = db.Column(db.Integer)
    
    tongsonguoithamgiasocuutren200nld = db.Column(db.Integer)
    tongsonguoinuthamgiasocuutren200nld = db.Column(db.Integer)
    

    tongsonguoithamgiasocuuduoi50nld = db.Column(db.Integer)
    tongsonguoinuthamgiasocuuduoi50nld = db.Column(db.Integer)

# Số cơ sở được quan trắc môi trường lao động/tổng số cơ sở báo cáo:
    socosoduocquantracmoitruonglaodong = db.Column(db.Integer)
    tongsocosobaocao = db.Column(db.Integer)

# VIII. TÌNH HÌNH KHÁM ĐỊNH KỲ VÀ KHÁM PHÁT HIỆN, GIÁM ĐỊNH BỆNH NGHỀ NGHIỆP
# 1. Phân loại sức khỏe:
    socosolaodongcokhamsuckhoedinhky = db.Column(db.Integer)
    socosolaodongcokhamsuckhoedinhkytongso = db.Column(db.Integer)
    loai1nam = db.Column(String(255))
    loai2nam = db.Column(String(255))
    loai3nam = db.Column(String(255))
    loai4nam = db.Column(String(255))
    loai5nam = db.Column(String(255))
    loai1nu = db.Column(String(255))
    loai2nu = db.Column(String(255))
    loai3nu = db.Column(String(255))
    loai4nu = db.Column(String(255))
    loai5nu = db.Column(String(255))

# 2. Kết quả khám phát hiện bệnh nghề nghiệp
    socosolaodongcokhambnn = db.Column(db.Integer)
    tongsocosoconguyco = db.Column(db.Integer)

# 3. Tổng hợp các trường hợp tai nạn lao động 
    songuoilaodongduocsocuu = db.Column(db.Integer)
    nguoilaodongduocdieutrimotlantrongnam = db.Column(db.Integer)
    songuoilaodongtainanlaodongdikham = db.Column(db.Integer)


# X. BÁO CÁO CÁC TRƯỜNG HỢP TAI NẠN LAO ĐỘNG ĐƯỢC KHÁM, ĐIỀU TRỊ TẠI CƠ SỞ KHÁM BỆNH, CHỮA BỆNH (KBCB)
# Số cơ sở KBCB báo cáo/Tổng số cơ sở KBCB trên địa bàn
    socosocobaocaotruonghoptainan = db.Column(db.Integer)
    tongsocosotruonghoptainan = db.Column(db.Integer)

# XI. KINH PHÍ CHI TRẢ CHO CÔNG TÁC VỆ SINH LAO ĐỘNG, CHĂM SÓC SỨC KHỎE NGƯỜI LAO ĐỘNG
# Số cơ sở có báo cáo/tổng số cơ sở lao động thuộc phạm vi quản lý:
    socosocobaocaokinhphi = db.Column(db.Integer)
    tongsocosokinhphi = db.Column(db.Integer)


# 3.1. Tổng hợp kết quả thực hiện của tuyến huyện
    socosolaodongduocgiaoban = db.Column(db.Integer)
    sotramyteduocgiaoban = db.Column(db.Integer)
    noidunggiaobancosoyte = db.Column(String(255))
    noidunggiaobantramyte = db.Column(String(255))
    dexuatkiennghicosoyte = db.Column(String(255))
    dexuatkiennghitramyte = db.Column(String(255))
# 4. Công tác thanh tra, kiểm tra việc thực hiện công tác vệ sinh lao động, chăm sóc sức khỏe người lao động, phòng chống bệnh nghề nghiệp trong kỳ báo cáo
    tongsocosolaodongduocthanhtraphuluc10  = db.Column(db.Integer)
    tongsocosocoyeutocohaiduocthanhtraphuluc10  = db.Column(db.Integer)
    ghichuthanhtra = db.Column(String(255))
    ########
    ##   
    ##	
    ########
    ##
    ##
    ##

    tinhhinhthuchienvanbanphapquyfield = db.relationship('TinhHinhThucHienVanBanPhapQuy', cascade="all, delete-orphan")
    phanloaicaccosolaodongtheonganhnghevaquymofield = db.relationship('PhanLoaiCacCoSoLaoDongTheoNganhNgheVaQuyMo', cascade="all, delete-orphan")
    phanloaicosolaodongytchnhfield = db.relationship('PhanLoaiCoSoLaoDongYTCHNH', cascade="all, delete-orphan")
    ketquaquantraccacyeutovikhihauvavatlyhoahoctrongmtfield = db.relationship('KetQuaQuanTracCacYeuToViKhiHauVaVatLyHoaHocTrongMT', cascade="all, delete-orphan")
    ketquaquantraccacyeutobuitrongmoitruonglaodongphuluc10field = db.relationship('KetQuaQuanTracCacYeuToBuiTrongMoiTruongLaoDongPhuLuc10', cascade="all, delete-orphan")
    ketquadanhgiacacyeutotiepxucnghenghiepvayeutotamlyfield = db.relationship('KetQuaDanhGiaCacYeuToTiepXucNgheNghiepVaYeuToTamLy', cascade="all, delete-orphan")
    tinhhinhnghiomphuluc10field = db.relationship('TinhHinhNghiOmPhuLuc10', cascade="all, delete-orphan")
    tongsotruonghopmaccacloaibenhthongthuongphuluc10field = db.relationship('TongSoTruongHopMacCacLoaiBenhThongThuongPhucluc10', cascade="all, delete-orphan")
    cactruonghopmacbenhnghenghiepphuluc10field = db.relationship('CacTruongHopMacBenhNgheNghiepPhuLuc10', cascade="all, delete-orphan")
    cactruonghoptainanlaodongphuluc10field = db.relationship('CacTruongHopTaiNanLaoDongPhuLuc10', cascade="all, delete-orphan")
    ketquakhamphathienbenhnghenghiepphuluc10field = db.relationship('KetQuaKhamPhatHienBenhNgheNghiepPhuLuc10', cascade="all, delete-orphan")
    danhsachnguoimacbenhnghenghiepphuluc10field = db.relationship('DanhSachNguoiMacBenhNgheNghiepPhuLuc10', cascade="all, delete-orphan")
    tonghoptubaocaocuacaccosolaodongphuluc10field = db.relationship('TongHopTuBaoCaoCuaCacCoSoLaoDongPhuLuc10', cascade="all, delete-orphan")
    cachoatdongdodonvitrienkhaiphuluc10field = db.relationship('CacHoatDongDoDonViTrienKhaiPhuLuc10', cascade="all, delete-orphan")
    danhsachcactruonghoptainanlaodongduockhamtaicsfield = db.relationship('DanhSachCacTruongHopTaiNanLaoDongDuocKhamTaiCS', cascade="all, delete-orphan")
    phanloaicactruonghoptainanlaodongtheoviecsocuuphuluc10field = db.relationship('PhanLoaiCacTruongHopTaiNanLaoDongTheoViecSoCuuPhuLuc10', cascade="all, delete-orphan")
    phanloaicactruonghoptainanlaodongtheonganhnghephuluc10field = db.relationship('PhanLoaiCacTruongHopTaiNanLaoDongTheoNganhNghePhuLuc10', cascade="all, delete-orphan")
    kinhphichitraphuluc10field = db.relationship('KinhPhiChiTraPhuLuc10', cascade="all, delete-orphan")
    danhsachcactochucquantractrendiabanfield = db.relationship('DanhSachCacToChucQuanTracTrenDiaBan', cascade="all, delete-orphan")
    danhsachcosokhambenhtrendiabanfield = db.relationship('DanhSachCosoKhamBenhTrenDiaBan', cascade="all, delete-orphan")
    danhsachtochuchuanluyentrendiabanfield = db.relationship('DanhSachToChucHuanLuyenTrenDiaBan', cascade="all, delete-orphan")


# 2. Tình hình thực hiện văn bản pháp quy 
class TinhHinhThucHienVanBanPhapQuy(CommonModel):
    __tablename__ = 'tinhhinhthuchienvanbanphapquy'
    id = db.Column(UUID(as_uuid=True), primary_key=True, default=default_uuid)
    vanbanphapquy = db.Column(String(255))
    soquanhuyenthixa = db.Column(db.Integer())
    socosolaodong  = db.Column(db.Integer())
    baocaohoatdongytelaodong6thangnam_id = db.Column(UUID(as_uuid=True), ForeignKey('baocaohoatdongytelaodong6thangnam.id'), nullable=True)

# II. PHÂN LOẠI CƠ SỞ LAO ĐỘNG THEO NGÀNH NGHỀ VÀ QUY MÔ
# 1. Phân loại các cơ sở lao động trong phạm vi quản lý theo ngành nghề, quy mô
class PhanLoaiCacCoSoLaoDongTheoNganhNgheVaQuyMo(CommonModel):
    __tablename__ = 'phanloaicaccosolaodongtheonganhnghevaquymo'
    id = db.Column(UUID(as_uuid=True), primary_key=True, default=default_uuid)
    loainganhnghe = db.Column(String(255))
    socsconho = db.Column(db.Integer)
    sonldcosoconho = db.Column(db.Integer)
    socscovua = db.Column(db.Integer)
    sonldcosocovua = db.Column(db.Integer)
    socscolon= db.Column(db.Integer)
    sonldcosocolon = db.Column(db.Integer)
    baocaohoatdongytelaodong6thangnam_id = db.Column(UUID(as_uuid=True), ForeignKey('baocaohoatdongytelaodong6thangnam.id'), nullable=True)

# 2. Phân loại cơ sở lao động YTCHNH theo ngành nghề, quy mô
class PhanLoaiCoSoLaoDongYTCHNH(CommonModel):
    __tablename__ = 'phanloaicosolaodongytchnh'
    id = db.Column(UUID(as_uuid=True), primary_key=True, default=default_uuid)
    loainganhnghe = db.Column(String(255))
    socsconho = db.Column(db.Integer)
    sonldcosoconho = db.Column(db.Integer)
    socscovua = db.Column(db.Integer)
    sonldcosocovua = db.Column(db.Integer)
    socscolon= db.Column(db.Integer)
    sonldcosocolon = db.Column(db.Integer)
    baocaohoatdongytelaodong6thangnam_id = db.Column(UUID(as_uuid=True), ForeignKey('baocaohoatdongytelaodong6thangnam.id'), nullable=True)

# V. KẾT QUẢ QUAN TRẮC MÔI TRƯỜNG LAO ĐỘNG TRONG KỲ BÁO CÁO
# 1. Kết quả quan trắc các yếu tố vi khí hậu và vật lý, hóa học trong môi trường lao động
class KetQuaQuanTracCacYeuToViKhiHauVaVatLyHoaHocTrongMT(CommonModel):
    __tablename__ = 'ketquaquantraccacyeutovikhihauvavatlyhoahoctrongmt'
    id = db.Column(UUID(as_uuid=True), primary_key=True, default=default_uuid)
    tencoso = db.Column(String(255))
    tongsonguoilaodong = db.Column(db.Integer)
    songuoitiepxuc = db.Column(db.Integer)
    nhietdo1 = db.Column(db.Integer)
    nhietdo2 = db.Column(db.Integer)
    doam1 = db.Column(db.Integer)
    doam2= db.Column(db.Integer)
    tocdogio1 = db.Column(db.Integer)
    tocdogio2= db.Column(db.Integer)
    anhsang1 = db.Column(db.Integer)
    anhsang2= db.Column(db.Integer)
    on1 = db.Column(db.Integer)
    on2= db.Column(db.Integer)
    rung1 = db.Column(db.Integer)
    rung2= db.Column(db.Integer)
    hkdoc1 = db.Column(db.Integer)
    hkdoc2= db.Column(db.Integer)
    phongxa1 = db.Column(db.Integer)
    phongxa2= db.Column(db.Integer)
    dientutruong1 = db.Column(db.Integer)
    dientutruong2= db.Column(db.Integer)
    yeutokhac1 = db.Column(db.Integer)
    yeutokhac2= db.Column(db.Integer)
    baocaohoatdongytelaodong6thangnam_id = db.Column(UUID(as_uuid=True), ForeignKey('baocaohoatdongytelaodong6thangnam.id'), nullable=True)

# 2. Kết quả quan trắc yếu tố bụi trong môi trường lao động
class KetQuaQuanTracCacYeuToBuiTrongMoiTruongLaoDongPhuLuc10(CommonModel):
    __tablename__ = 'ketquaquantraccacyeutobuitrongmoitruonglaodongphuluc10'
    id = db.Column(UUID(as_uuid=True), primary_key=True, default=default_uuid)
    tencoso = db.Column(String(255))
    tongsonguoilaodong = db.Column(db.Integer)
    songuoitiepxucvoicacyeutobui = db.Column(db.Integer)
    buitoanphan1 = db.Column(db.Integer)
    buitoanphan2 = db.Column(db.Integer)
    buihohap1 = db.Column(db.Integer)
    buihohap2= db.Column(db.Integer)
    buisilic1 = db.Column(db.Integer)
    buisilic2= db.Column(db.Integer)
    buikhac1 = db.Column(db.Integer)
    buikhac2= db.Column(db.Integer)
    baocaohoatdongytelaodong6thangnam_id = db.Column(UUID(as_uuid=True), ForeignKey('baocaohoatdongytelaodong6thangnam.id'), nullable=True)

# 3. Kết quả đánh giá các yếu tố tiếp xúc nghề nghiệp và yếu tố tâm sinh lý và ec-gô-nô-my
class KetQuaDanhGiaCacYeuToTiepXucNgheNghiepVaYeuToTamLy(CommonModel):
    __tablename__ = 'ketquadanhgiacacyeutotiepxucnghenghiepvayeutotamly'
    id = db.Column(UUID(as_uuid=True), primary_key=True, default=default_uuid)
    tencoso = db.Column(String(255))
    tongsonguoilaodong = db.Column(db.Integer)
    yeutotiepxuc = db.Column(db.Integer)
    songuoitiepxuc = db.Column(db.Integer)
    ketquadanhgia = db.Column(db.Integer)
    songuoiduocdanhgiaecgonomy = db.Column(db.Integer)
    ketquadanhgiaecgonomy= db.Column(db.Integer)
    baocaohoatdongytelaodong6thangnam_id = db.Column(UUID(as_uuid=True), ForeignKey('baocaohoatdongytelaodong6thangnam.id'), nullable=True)

# VII. TÌNH HÌNH SỨC KHỎE VÀ BỆNH TẬT
# 1. Tình hình nghỉ ốm
# Số cơ sở có báo cáo/tổng số cơ sở lao động trong phạm vi quản lý:
class TinhHinhNghiOmPhuLuc10(CommonModel):
    __tablename__ = 'tinhhinhnghiomphuluc10'
    id = db.Column(UUID(as_uuid=True), primary_key=True, default=default_uuid)
    tencoso = db.Column(String(255))
    songuoiom = db.Column(db.Integer)
    songayom = db.Column(db.Integer)
    songuoitainanlaodong = db.Column(db.Integer)
    songaytainanlaodong = db.Column(db.Integer)
    songuoibenhnghenghiep = db.Column(db.Integer)
    songaybenhnghenghiep= db.Column(db.Integer)
    baocaohoatdongytelaodong6thangnam_id = db.Column(UUID(as_uuid=True), ForeignKey('baocaohoatdongytelaodong6thangnam.id'), nullable=True)

# 2. Tình hình bệnh tật và tai nạn lao động
# Số cơ sở có báo cáo/tổng số cơ sở lao động trong phạm vi quản lý: _____ / ______
class TongSoTruongHopMacCacLoaiBenhThongThuongPhucluc10(CommonModel):
    __tablename__ = 'tongsotruonghopmaccacloaibenhthongthuongphuluc10'
    id = db.Column(UUID(as_uuid=True), primary_key=True, default=default_uuid)
    nhombenh = db.Column(String(255))
    sotruonghopquy1 = db.Column(String(255))
    sotruonghopquy2 = db.Column(String(255))
    sotruonghopquy3 = db.Column(String(255))
    sotruonghopquy4 = db.Column(String(255))
    baocaohoatdongytelaodong6thangnam_id = db.Column(UUID(as_uuid=True), ForeignKey('baocaohoatdongytelaodong6thangnam.id'), nullable=True)
# 2. Các trường hợp mắc bệnh nghề nghiệp
class CacTruongHopMacBenhNgheNghiepPhuLuc10(CommonModel):
    __tablename__ = 'cactruonghopmacbenhnghenghiepphuluc10'
    id = db.Column(UUID(as_uuid=True), primary_key=True, default=default_uuid)
    benhnghenghiep = db.Column(String(255))
    sotruonghopquy1 = db.Column(String(255))
    sotruonghopquy2 = db.Column(String(255))
    sotruonghopquy3 = db.Column(String(255))
    sotruonghopquy4 = db.Column(String(255))
    baocaohoatdongytelaodong6thangnam_id = db.Column(UUID(as_uuid=True), ForeignKey('baocaohoatdongytelaodong6thangnam.id'), nullable=True)

# 3. Các trường hợp tai nạn lao động
class CacTruongHopTaiNanLaoDongPhuLuc10(CommonModel):
    __tablename__ = 'cactruonghoptainanlaodongphuluc10'
    id = db.Column(UUID(as_uuid=True), primary_key=True, default=default_uuid)
    tainanlaodong = db.Column(String(255))
    sotruonghopquy1mac = db.Column(String(255))
    sotruonghopquy1chet = db.Column(String(255))
    sotruonghopquy2mac = db.Column(String(255))
    sotruonghopquy2chet = db.Column(String(255))
    sotruonghopquy3mac = db.Column(String(255))
    sotruonghopquy3chet = db.Column(String(255))
    sotruonghopquy4mac = db.Column(String(255))
    sotruonghopquy4chet = db.Column(String(255))
    baocaohoatdongytelaodong6thangnam_id = db.Column(UUID(as_uuid=True), ForeignKey('baocaohoatdongytelaodong6thangnam.id'), nullable=True)


# 2. Kết quả khám phát hiện bệnh nghề nghiệp
class KetQuaKhamPhatHienBenhNgheNghiepPhuLuc10(CommonModel):
    __tablename__ = 'ketquakhamphathienbenhnghenghiepphuluc10'
    id = db.Column(UUID(as_uuid=True), primary_key=True, default=default_uuid)
    tenbenhnghenghiep = db.Column(String(255))
    tongsonldduockhamsuckhoephathienbnn = db.Column(db.Integer())
    tongsonldnuduockhamsuckhoephathienbnn = db.Column(db.Integer())
    tongsondlduocchuandoanbnn = db.Column(db.Integer())
    tongsondlnuduocchuandoanbnn = db.Column(db.Integer())
    tongsonldduocgiamdinhbnn = db.Column(db.Integer())
    tongsonldnuduocgiamdinhbnn = db.Column(db.Integer())
    tongsogiamdinhnhohon5phantram = db.Column(db.Integer())
    tongsogiamdinhnhohon5phantramnu = db.Column(db.Integer())
    tongsogiamdinhlonhon31phantram = db.Column(db.Integer())
    tongsogiamdinhlonhon31phantramnu = db.Column(db.Integer())
    tongsogiamdinhlonhon5nhohon31phantram= db.Column(db.Integer())
    tongsogiamdinhlonhon5nhohon31phantramnu = db.Column(db.Integer())
    baocaohoatdongytelaodong6thangnam_id = db.Column(UUID(as_uuid=True), ForeignKey('baocaohoatdongytelaodong6thangnam.id'), nullable=True)
# 3. Danh sách người mắc bệnh nghề nghiệp
class DanhSachNguoiMacBenhNgheNghiepPhuLuc10(CommonModel):
    __tablename__ = 'danhsachnguoimacbenhnghenghiepphuluc10'
    id = db.Column(UUID(as_uuid=True), primary_key=True, default=default_uuid)
    hotenbenhnhan = db.Column(String(255))
    tuoinam = db.Column(db.Integer())
    tuoinu = db.Column(db.Integer())
    nghekhibibnn = db.Column(String(255))
    tuoinghe = db.Column(String(255))
    ngayphathienbenh = db.Column(db.DateTime())
    tenbnn = db.Column(String(255))
    tylesuygiamknld = db.Column(String(255))
    congviechiennay = db.Column(String(255))
    baocaohoatdongytelaodong6thangnam_id = db.Column(UUID(as_uuid=True), ForeignKey('baocaohoatdongytelaodong6thangnam.id'), nullable=True)
# IX. HUẤN LUYỆN VỀ Y TẾ LAO ĐỘNG VÀ BỆNH NGHỀ NGHIỆP   
class TongHopTuBaoCaoCuaCacCoSoLaoDongPhuLuc10(CommonModel):
    __tablename__ = 'tonghoptubaocaocuacaccosolaodongphuluc10'
    id = db.Column(UUID(as_uuid=True), primary_key=True, default=default_uuid)
    noidung = db.Column(String(255))
    socosolaodongduochuanluyen = db.Column(db.Integer())
    tongso = db.Column(db.Integer())
    sonu = db.Column(db.Integer())
    baocaohoatdongytelaodong6thangnam_id = db.Column(UUID(as_uuid=True), ForeignKey('baocaohoatdongytelaodong6thangnam.id'), nullable=True)
class CacHoatDongDoDonViTrienKhaiPhuLuc10(CommonModel):
    __tablename__ = 'cachoatdongdodonvitrienkhaiphuluc10'
    id = db.Column(UUID(as_uuid=True), primary_key=True, default=default_uuid)
    noidung = db.Column(String(255))
    socosolaodongduochuanluyen = db.Column(db.Integer())
    tongso = db.Column(db.Integer())
    sonu = db.Column(db.Integer())
    baocaohoatdongytelaodong6thangnam_id = db.Column(UUID(as_uuid=True), ForeignKey('baocaohoatdongytelaodong6thangnam.id'), nullable=True)
# X. BÁO CÁO CÁC TRƯỜNG HỢP TAI NẠN LAO ĐỘNG ĐƯỢC KHÁM, ĐIỀU TRỊ TẠI CƠ SỞ KHÁM BỆNH, CHỮA BỆNH (KBCB)
# 1. Danh sách các trường hợp tai nạn lao động được khám, điều trị tại cơ sở KBCB
class DanhSachCacTruongHopTaiNanLaoDongDuocKhamTaiCS(CommonModel):
    __tablename__ = 'danhsachcactruonghoptainanlaodongduockhamtaics'
    id = db.Column(UUID(as_uuid=True), primary_key=True, default=default_uuid)
    hovaten = db.Column(String(255))
    tuoinam = db.Column(db.Integer())
    tuoinu = db.Column(db.Integer())
    ngaybitainan = db.Column(db.DateTime())
    nghenghiep = db.Column(String(255))
    bophanbitonthuong = db.Column(String(255))
    duocsocuutaicho = db.Column(db.Integer())
    phuongtienchuyendencosokbcb = db.Column(String(255))
    thoigiandieutri = db.Column(db.DateTime())
    ketquadieutri = db.Column(db.Integer())
    ghichu = db.Column(String(255))
    baocaohoatdongytelaodong6thangnam_id = db.Column(UUID(as_uuid=True), ForeignKey('baocaohoatdongytelaodong6thangnam.id'), nullable=True)

# 2. Phân loại các trường hợp tai nạn lao động theo việc sơ cứu, cấp cứu và điều trị
class PhanLoaiCacTruongHopTaiNanLaoDongTheoViecSoCuuPhuLuc10(CommonModel):
    __tablename__ = 'phanloaicactruonghoptainanlaodongtheoviecsocuuphuluc10'
    id = db.Column(UUID(as_uuid=True), primary_key=True, default=default_uuid)
    cosokbcb = db.Column(String(255))
    songuoiduocsocuutaicho = db.Column(db.Integer())
    tongsonguoiduocdieutritaicosokbcb = db.Column(db.Integer())
    tongsonguoiduocdieutrikhoitaicosokbcb = db.Column(db.Integer())
    tongsonguoiduocdieutrikhoidelaidichungtaicosokbcb = db.Column(db.Integer())
    tongsonguoiduocdieutrituvongtaicosokbcb = db.Column(db.Integer())
    ghichu = db.Column(String(255))
    baocaohoatdongytelaodong6thangnam_id = db.Column(UUID(as_uuid=True), ForeignKey('baocaohoatdongytelaodong6thangnam.id'), nullable=True)
# 4. Phân loại các trường hợp tai nạn lao động theo ngành nghề
class PhanLoaiCacTruongHopTaiNanLaoDongTheoNganhNghePhuLuc10(CommonModel):
    __tablename__ = 'phanloaicactruonghoptainanlaodongtheonganhnghephuluc10'
    id = db.Column(UUID(as_uuid=True), primary_key=True, default=default_uuid)
    manganhnghe = db.Column(String(255))
    nganhnghe = db.Column(String(255))
    tongso = db.Column(db.Integer())
    baocaohoatdongytelaodong6thangnam_id = db.Column(UUID(as_uuid=True), ForeignKey('baocaohoatdongytelaodong6thangnam.id'), nullable=True)
# IX. KINH PHÍ CHI TRẢ CHO CÔNG TÁC VỆ SINH LAO ĐỘNG, CHĂM SÓC SỨC KHỎE NGƯỜI LAO ĐỘNG     
class KinhPhiChiTraPhuLuc10(CommonModel):
    __tablename__ = 'kinhphichitraphuluc10'
    id = db.Column(UUID(as_uuid=True), primary_key=True, default=default_uuid)
    noidung = db.Column(String(255))
    sotien = db.Column(String(255))
    ghichu = db.Column(String(255))
    baocaohoatdongytelaodong6thangnam_id = db.Column(UUID(as_uuid=True), ForeignKey('baocaohoatdongytelaodong6thangnam.id'), nullable=True)


# XII. BÁO CÁO QUẢN LÝ CƠ SỞ QUAN TRẮC MÔI TRƯỜNG LAO ĐỘNG, KHÁM BỆNH NGHỀ NGHIỆP, HUẤN LUYỆN Y TẾ LAO ĐỘNG VÀ SƠ CỨU, CẤP CỨU (Chỉ áp dụng đối với Sở Y tế) 
# 1. Danh sách các tổ chức thực hiện quan trắc môi trường lao động trên địa bàn
class DanhSachCacToChucQuanTracTrenDiaBan(CommonModel):
    __tablename__ = 'danhsachcactochucquantractrendiaban'
    id = db.Column(UUID(as_uuid=True), primary_key=True, default=default_uuid)
    tencoso = db.Column(String(255))
    diachi = db.Column(String(255))
    soluongcanbo = db.Column(db.Integer())
    socosolaodongthuchien = db.Column(db.Integer())
    nhanxet = db.Column(String(255))
    baocaohoatdongytelaodong6thangnam_id = db.Column(UUID(as_uuid=True), ForeignKey('baocaohoatdongytelaodong6thangnam.id'), nullable=True)
# 2. Danh sách cơ sở khám bệnh nghề nghiệp trên địa bàn
class DanhSachCosoKhamBenhTrenDiaBan(CommonModel):
    __tablename__ = 'danhsachcosokhambenhtrendiaban'
    id = db.Column(UUID(as_uuid=True), primary_key=True, default=default_uuid)
    tencoso = db.Column(String(255))
    diachi = db.Column(String(255))
    soluongcanbo = db.Column(db.Integer())
    socosolaodongthuchien = db.Column(db.Integer())
    nhanxet = db.Column(String(255))
    baocaohoatdongytelaodong6thangnam_id = db.Column(UUID(as_uuid=True), ForeignKey('baocaohoatdongytelaodong6thangnam.id'), nullable=True)
# 3. Danh sách tổ chức huấn luyện y tế lao động, sơ cứu, cấp cứu trên địa bàn
class DanhSachToChucHuanLuyenTrenDiaBan(CommonModel):
    __tablename__ = 'danhsachtochuchuanluyentrendiaban'
    id = db.Column(UUID(as_uuid=True), primary_key=True, default=default_uuid)
    tencoso = db.Column(String(255))
    diachi = db.Column(String(255))
    soluongcanbo = db.Column(db.Integer())
    socosolaodongthuchien = db.Column(db.Integer())
    nhanxet = db.Column(String(255))
    baocaohoatdongytelaodong6thangnam_id = db.Column(UUID(as_uuid=True), ForeignKey('baocaohoatdongytelaodong6thangnam.id'), nullable=True)


#Hết Báo Cáo 1 Phụ Lục 10 
##############################################################################
##############################################################################
##############################################################################
#Báo Cáo 1 phụ lục 11
# MẪU BÁO CÁO TỔ CHỨC ĐỦ ĐIỀU KIỆN QUAN TRẮC MÔI TRƯỜNG LAO ĐỘNG ĐÃ ĐƯỢC CÔNG BỐ
class BaoCaoToChucDuDieuKienQuanTracMoiTruongLaoDongDuocCongBo(CommonModel):
    __tablename__ = 'baocaotochucdudieukienquantracmoitruonglaodongduoccongbo'
    id = db.Column(UUID(as_uuid=True), primary_key=True, default=default_uuid)
    donvibaocao = db.Column(String(255))
    so = db.Column(String(255))
    bc = db.Column(String(255))
    noivietbaocao = db.Column(String(255))
    ngayvietbaocao = db.Column(String(255))
    thangvietbaocao = db.Column(String(255))
    namvietbaocao = db.Column(String(255))
    thoigianvietbaocao = db.Column(db.DateTime())
    ngaytienhanh = db.Column(String(255))
    thangtienhanh = db.Column(String(255))
    namtienhanh = db.Column(String(255))
    tentochuc = db.Column(String(255))
    nguoidaidien = db.Column(String(255))
    chucvu = db.Column(String(255))
    diachi = db.Column(String(255))
    sodienthoai = db.Column(String(255))
    sofax = db.Column(String(255))
    email = db.Column(String(255))
    website = db.Column(String(255))
    nguoichiutrachnhiemchuyenmon = db.Column(String(255))
    chucvunguoichiutrachnhiem = db.Column(String(255))
    sodienthoainguoichiutrachnhiem = db.Column(String(255))

    yeutonhietdo = db.Column(db.Integer())
    yeutodoam = db.Column(db.Integer())
    yeutotocdogio = db.Column(db.Integer())
    yeutobucxanhiet = db.Column(db.Integer())

    yeutoanhsang = db.Column(db.Integer())
    yeutotiengontheodaitan = db.Column(db.Integer())
    yeutorungchuyentheodaitan = db.Column(db.Integer())
    yeutovantocrungdunghoacngang = db.Column(db.Integer())
    yeutophongxa = db.Column(db.Integer())
    yeutodientutruongtansocongnghiep = db.Column(db.Integer())
    yeutodientutruongtansocao = db.Column(db.Integer())
    yeutobucxatungoai = db.Column(db.Integer())

    yeutobuitoanphan = db.Column(db.Integer())
    yeutobuihohap = db.Column(db.Integer())
    yeutobuithongthuong = db.Column(db.Integer())
    yeutobuisilic = db.Column(db.Integer())
    yeutobuiamiang = db.Column(db.Integer())
    yeutobuikimloai = db.Column(db.Integer())
    yeutobuithan = db.Column(db.Integer())
    yeutobuitalc = db.Column(db.Integer())
    yeutobuibong = db.Column(db.Integer())
 
    yeutothuyngan = db.Column(db.Integer())
    yeutoasen = db.Column(db.Integer())
    yeutooxitcacbon = db.Column(db.Integer())
    yeutobenzen = db.Column(db.Integer())
    yeutotnt = db.Column(db.Integer())
    yeutonicotin = db.Column(db.Integer())
    yeutohoachattrusau = db.Column(db.Integer())

    danhgiaganhnangthankinhtamly = db.Column(db.Integer())
    danhgiaecgonomy = db.Column(db.Integer())

    yeutovisinhvat = db.Column(db.Integer())
    yeutogaydiung = db.Column(db.Integer())
    yeutodungmoi = db.Column(db.Integer())
    yeutogayungthu = db.Column(db.Integer())


    cacyeutovatlykhac_field = db.relationship('CacYeuToVatLyKhac', cascade="all, delete-orphan")
    cacloaibuikhac_field = db.relationship('CacLoaiBuiKhac', cascade="all, delete-orphan")
    cachoachatkhac_field = db.relationship('CacHoaChatKhac', cascade="all, delete-orphan")
    cacyeutokhac_field = db.relationship('CacYeuToKhac', cascade="all, delete-orphan")



class CacYeuToVatLyKhac(CommonModel):
    __tablename__ = 'cacyeutovatlykhac'
    id = db.Column(UUID(as_uuid=True), primary_key=True, default=default_uuid)
    yeuto = db.Column(String(255))
    baocaotochucdudieukienquantracmoitruonglaodongduoccongbo_id = db.Column(UUID(as_uuid=True), ForeignKey('baocaotochucdudieukienquantracmoitruonglaodongduoccongbo.id'), nullable=True)

class CacLoaiBuiKhac(CommonModel):
    __tablename__ = 'cacloaibuikhac'
    id = db.Column(UUID(as_uuid=True), primary_key=True, default=default_uuid)
    yeuto = db.Column(String(255))
    baocaotochucdudieukienquantracmoitruonglaodongduoccongbo_id = db.Column(UUID(as_uuid=True), ForeignKey('baocaotochucdudieukienquantracmoitruonglaodongduoccongbo.id'), nullable=True)

class CacHoaChatKhac(CommonModel):
    __tablename__ = 'cachoachatkhac'
    id = db.Column(UUID(as_uuid=True), primary_key=True, default=default_uuid)
    yeuto = db.Column(String(255))
    baocaotochucdudieukienquantracmoitruonglaodongduoccongbo_id = db.Column(UUID(as_uuid=True), ForeignKey('baocaotochucdudieukienquantracmoitruonglaodongduoccongbo.id'), nullable=True)
class CacYeuToKhac(CommonModel):
    __tablename__ = 'cacyeutokhac'
    id = db.Column(UUID(as_uuid=True), primary_key=True, default=default_uuid)
    yeuto = db.Column(String(255))
    baocaotochucdudieukienquantracmoitruonglaodongduoccongbo_id = db.Column(UUID(as_uuid=True), ForeignKey('baocaotochucdudieukienquantracmoitruonglaodongduoccongbo.id'), nullable=True)
#Hết Báo Cáo 1 Phụ Lục 11





##############################################################################
##############################################################################
##############################################################################
#Báo Cáo 1 phụ lục 13
class ChungChiDaoTaoVeQuanTracMoiTruongLaoDong(CommonModel):
    __tablename__ = 'chungchidaotaovequantracmoitruonglaodong'
    id = db.Column(UUID(as_uuid=True), primary_key=True, default=default_uuid)
    so = db.Column(String(255))
    gcn = db.Column(String(255))
    noivietchungchi = db.Column(String(255))
    ngayvietchungchi = db.Column(String(255))
    thangvietchungchi = db.Column(String(255))
    namvietchungchi = db.Column(String(255))
    chungnhanongba = db.Column(String(255))
    sinhngay = db.Column(String(255))
    chungminhthu = db.Column(String(255))
    diachi = db.Column(String(255))
    thoigianhuanluyen = db.Column(String(255))
    tungay = db.Column(String(255))
    tuthang = db.Column(String(255))
    tunam = db.Column(String(255))
    denngay = db.Column(String(255))
    denthang = db.Column(String(255))
    dennam = db.Column(String(255))
    noiky = db.Column(String(255))
    ngayky = db.Column(String(255))
    thangky = db.Column(String(255))
    namky = db.Column(String(255))
#Hết Báo Cáo 1 Phụ Lục 13