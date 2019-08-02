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
    phanloaisuckhoe =db.Column(db.Integer())
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
    phanloaisuckhoe = db.Column(db.Integer())
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
    luuykhibotricongviec = db.Column(String(255))
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
    sotheodoicongtachuanluyensocuucapcuutainoilamviec = relationship('SoTheoDoiCongTacHuanLuyenSoCuuCapCuuTaiNoiLamViec')  

class BangDanhSachThanhVienLucLuongSoCuuDuocHuanLuyen(CommonModel):
    __tablename__ = 'bangdanhsachthanhvienlucluongsocuuduochuanluyen'
    id = db.Column(UUID(as_uuid=True), primary_key=True, default=default_uuid)
    hovaten  = db.Column(String(255))
    namsinhnam = db.Column(db.Integer())
    namsinhnu = db.Column(db.Integer())
    vitrilamviec = db.Column(String(255))
    sotheodoicongtachuanluyensocuucapcuutainoilamviec_id = db.Column(UUID(as_uuid=True), ForeignKey('sotheodoicongtachuanluyensocuucapcuutainoilamviec.id'), nullable=True)
    sotheodoicongtachuanluyensocuucapcuutainoilamviec = relationship('SoTheoDoiCongTacHuanLuyenSoCuuCapCuuTaiNoiLamViec')  

class BangDanhSachNguoiLaoDongDuocHuanLuyen(CommonModel):
    __tablename__ = 'bangdanhsachnguoilaodongduochuanluyen'
    id = db.Column(UUID(as_uuid=True), primary_key=True, default=default_uuid)
    hovaten  = db.Column(String(255))
    namsinhnam = db.Column(db.Integer())
    namsinhnu = db.Column(db.Integer())
    vitrilamviec = db.Column(String(255))
    sotheodoicongtachuanluyensocuucapcuutainoilamviec_id = db.Column(UUID(as_uuid=True), ForeignKey('sotheodoicongtachuanluyensocuucapcuutainoilamviec.id'), nullable=True)
    sotheodoicongtachuanluyensocuucapcuutainoilamviec = relationship('SoTheoDoiCongTacHuanLuyenSoCuuCapCuuTaiNoiLamViec')  

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
    tongsonguoilaodong = db.Column(db.Integer))
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


# 7.1. Người làm công tác y tế tại cơ sở lao động:     
class NguoiLamCongTacYTeTaiCoSoLaoDong(CommonModel):
    __tablename__ = 'nguoilamcongtacytetaicosolaodong'
    id = db.Column(UUID(as_uuid=True), primary_key=True, default=default_uuid)
    hovaten = db.Column(String(255))
    trinhdochuyenmon = db.Column(String(255))
    sodienthoailienhe = db.Column(String(255))
    chungchiyte = db.Column(String(255))



# 9. Công tác thanh tra, kiểm tra việc thực hiện công tác vệ sinh lao động, chăm sóc sức khỏe người lao động, phòng chống bệnh nghề nghiệp trong kỳ báo cáo (của các cơ quan chức năng đối với cơ sở lao động)
class CongTacThanhTra(CommonModel):
    __tablename__ = 'congtacthanhtra'
    id = db.Column(UUID(as_uuid=True), primary_key=True, default=default_uuid)
    ngaykiemtra = db.Column(db.DateTime())
    donvikiemtra = db.Column(String(255))
    noidungkiemtra = db.Column(String(255))
    ghichu = db.Column(String(255))

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
# III. Nghỉ việc do ốm đau, tai nạn lao động và bệnh nghề nghiệp
class NghiViecDoOmDauTaiNanLaoDongVaBenhNgheNghiep(CommonModel):
    __tablename__ = 'nghiviecdoomdautainanlaodongvabenhnghenghiep'
    id = db.Column(UUID(as_uuid=True), primary_key=True, default=default_uuid)
    thang = db.Column(db.Integer(255))
    songuoiom = db.Column(String(255))
    songaynghiom = db.Column(String(255)) 
    songuoitainanlaodong = db.Column(String(255))
    songaynghitainanlaodong = db.Column(String(255))
    songuoinghibenhnghenghiep = db.Column(String(255))
    songaynghibenhnghenghiep = db.Column(String(255))


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

# 2. Các trường hợp mắc bệnh nghề nghiệp
class CacTruongHopMacBenhNgheNghiep(CommonModel):
    __tablename__ = 'cactruonghopmacbenhnghenghiep'
    id = db.Column(UUID(as_uuid=True), primary_key=True, default=default_uuid)
    benhnghenghiep = db.Column(String(255))
    sotruonghopquy1mac = db.Column(String(255))
    sotruonghopquy1chet = db.Column(String(255))
    sotruonghopquy2mac = db.Column(String(255))
    sotruonghopquy2chet = db.Column(String(255))
    sotruonghopquy3mac = db.Column(String(255))
    sotruonghopquy3chet = db.Column(String(255))
    sotruonghopquy4mac = db.Column(String(255))
    sotruonghopquy4chet = db.Column(String(255))


# VI. Phân loại sức khỏe
class PhanLoaiSucKhoe(CommonModel):
    __tablename__ = 'phanloaisuckhoe'
    id = db.Column(UUID(as_uuid=True), primary_key=True, default=default_uuid)
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



# VII. Công tác huấn luyện
class CongTacHuanLuyen(CommonModel):
    __tablename__ = 'congtachuanluyen'
    id = db.Column(UUID(as_uuid=True), primary_key=True, default=default_uuid)
    noidunghuanluyen = db.Column(String(255))
    tongsonguoiduochuanluyen = db.Column(String(255))
    tongsonuduochuanluyen = db.Column(String(255))



# VIII. Kinh phí chi trả cho công tác vệ sinh lao động, chăm sóc sức khỏe người lao động
class KinhPhiVeSinhLaoDongVaChamSocSucKhoeNguoiLaoDong(CommonModel):
    __tablename__ = 'kinhphivesinhlaodongvachamsocsuckhoenguoilaodong'
    id = db.Column(UUID(as_uuid=True), primary_key=True, default=default_uuid)
    sotienkhamsuckhoedinhky = db.Column(String(255))
    ghichukhamsuckhoedinhky = db.Column(String(255))
    sotienkhamphathienbenhnghenhgiep = db.Column(String(255))
    ghichukhamphathienbenhnghenghiep = db.Column(String(255))
    sotienkhamdinhkybenhnghenghiep = db.Column(String(255))
    ghichukhamdinhkybenhnghenghiep = db.Column(String(255))
    sotienhuanluyenantoanvesinhlaodong = db.Column(String(255))
    ghichuhuanluyenantoanvesinhlaodong = db.Column(String(255))
    sotienhuanluyensocuucapcuu = db.Column(String(255))
    ghichuhuanluyensocuucapcuu = db.Column(String(255))
    sotienquantracmoitruonglaodong = db.Column(String(255))
    ghichuquanmoitractruonglaodong = db.Column(String(255))
    sotienboithuongtainanlaodong = db.Column(String(255))
    ghichuboithuongtainanlaodong = db.Column(String(255))
    sotienboithuongbenhnghenghiep = db.Column(String(255))
    ghichuboithuongbenhnghenghiep = db.Column(String(255))
    sotienchiphidieuchicacbenhthongthuong = db.Column(String(255))
    ghichuchiphidieuchicacbenhthongthuong = db.Column(String(255))
    sotienchiphilienquankhac = db.Column(String(255))
    ghichuchiphilienquankhac = db.Column(String(255))


# IX. Các kiến nghị và kế hoạch dự kiến trong kỳ báo cáo tớ
class CacKienNghiDuKienVaKeHoachDuKienTrongKyToi(CommonModel):
    __tablename__ = 'cackiennghidukienvakehoachdukientrongkytoi'
    id = db.Column(UUID(as_uuid=True), primary_key=True, default=default_uuid)
    noidung = db.Column(String(255))


# Hết Báo cáo 1 Phụ lục 8



