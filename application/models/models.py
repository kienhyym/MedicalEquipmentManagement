from application.database import db,redisdb
from application.database.model import CommonModel
from sqlalchemy import (and_, or_, String,SmallInteger, Integer, BigInteger, Boolean, DECIMAL, Float, Text, ForeignKey, UniqueConstraint, Index, DateTime)
from sqlalchemy.dialects.postgresql import UUID, JSONB

from sqlalchemy.orm import relationship, backref
import uuid

def default_uuid():
    return str(uuid.uuid4())

    
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


roles_users = db.Table('roles_users',
                       db.Column('user_id', UUID(as_uuid=True), db.ForeignKey('user.id', ondelete='cascade'), primary_key=True),
                       db.Column('role_id', UUID(as_uuid=True), db.ForeignKey('role.id', onupdate='cascade'), primary_key=True))


class Role(CommonModel):
    __tablename__ = 'role'
    id = db.Column(UUID(as_uuid=True), primary_key=True, default=default_uuid)
    name = db.Column(db.String(80), unique=True)
    description = db.Column(db.String(255))
    
class Permission(CommonModel):
    __tablename__ = 'permission'
    id = db.Column(Integer(), primary_key=True)
    role_id = db.Column(UUID(as_uuid=True), ForeignKey('role.id'), nullable=False)
    subject = db.Column(String,index=True)
    permission = db.Column(String)
    value = db.Column(Boolean, default=False)
    __table_args__ = (UniqueConstraint('role_id', 'subject', 'permission', name='uq_permission_role_subject_permission'),)

class AppInfo(CommonModel):
    __tablename__ = 'appinfo'
    id = db.Column(Integer, primary_key=True)
    appkey = db.Column(String, index=True, nullable=False, unique=True, default=default_uuid)
    secret = db.Column(String, nullable=False)
    name = db.Column(String, nullable=False)
    description = db.Column(String)
    status = db.Column(Integer, default=0)
    
class User(CommonModel):
    __tablename__ = 'user'
    id = db.Column(UUID(as_uuid=True), primary_key=True, default=default_uuid)
    phone_number =  db.Column(String(50), index=True, nullable=True)
    email =  db.Column(String(50), index=True, nullable=True)
    name = db.Column(String(50))
    password = db.Column(String, nullable=True)
    salt = db.Column(db.String())
    tinhthanh_id = db.Column(String, nullable=True)
    tinhthanh = db.Column(JSONB)
    quanhuyen_id = db.Column(String, nullable=True)
    quanhuyen = db.Column(JSONB)
    xaphuong_id = db.Column(String, nullable=True)
    xaphuong = db.Column(JSONB)
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


class DanhMucDoanhNghiep(CommonModel):
    __tablename__ = 'danhmucdoanhnghiep'
    id = db.Column(UUID(as_uuid=True), primary_key=True, default=default_uuid)
    code = db.Column(String, index=True, unique=True)
    name = db.Column(String, nullable=False)
    description = db.Column(String)
    email = db.Column(String)
    dienthoai = db.Column(String)
    diachi = db.Column(String)
    tinhthanh_id = db.Column(String,  nullable=True)
    tinhthanh = db.Column(JSONB)
    quanhuyen_id = db.Column(String,  nullable=True)
    quanhuyen = db.Column(JSONB)
    xaphuong_id = db.Column(String,  nullable=True)
    xaphuong = db.Column(JSONB)
    type = db.Column(String)
    status = db.Column(Integer, default=0)    
    
class KeHoachThanhTra(CommonModel):
    __tablename__ = 'kehoachthanhtra'
    id = db.Column(String, primary_key=True)
    
    makehoach = db.Column(String(255))
    tenkehoach = db.Column(String(255))
    
    madoanhnghiep = db.Column(String(50), index=True, nullable=False)
    tendoanhnghiep = db.Column(String(50), index=True, nullable=False)
    doanhnghiep = db.Column(JSONB)
    tailieulienquan = db.Column(JSONB)
    userid_nguoisoanthao = db.Column(String)
    username_nguoisoanthao = db.Column(String)
    ngaysoanthao = db.Column(DateTime)
    userid_phongduyet = db.Column(String)
    username_phongduyet = db.Column(String)
    ngaypheduyet_phong = db.Column(DateTime)
    userid_pctduyet = db.Column(String)
    username_pctduyet = db.Column(String)
    ngaypheduyet_pct = db.Column(DateTime)
    userid_quyetdinh = db.Column(String)
    username_quyetdinh = db.Column(String)
    ngaypheduyet_quyetdinh = db.Column(DateTime)
    loaithanhtra = db.Column(String)
    doanthanhtra = db.Column(String)
    truongdoanthanhhtra = db.Column(String)
    ngaythanhtra = db.Column(DateTime)
    ketquathanhtra = db.Column(String)
    ketluanthanhtra = db.Column(String)
    ngayketthuc = db.Column(DateTime)
    trangthai = db.Column(String)
# Index('hosobenhnhan_uq_sochamsoc_id', HoSoBenhNhan.sochamsoc_id, unique=True, postgresql_where=(and_(HoSoBenhNhan.sochamsoc_id.isnot(None),HoSoBenhNhan.sochamsoc_id !='')))

    
class Notify(CommonModel):
    __tablename__ = 'notify'
    id = db.Column(UUID(as_uuid=True), primary_key=True, default=default_uuid)
    title = db.Column(String, index=True)
    content = db.Column(String)
    type = db.Column(String(20))  # text/image/video
    url = db.Column(String)
    action = db.Column(JSONB())
    notify_condition = db.Column(JSONB())
    
class NotifyUser(CommonModel):
    __tablename__ = 'notify_user'
    id = db.Column(String, primary_key=True)
    user_id = db.Column(UUID(as_uuid=True))
    notify_id = db.Column(UUID(as_uuid=True), ForeignKey('notify.id'), nullable=True)
    notify = db.relationship('Notify')
    notify_at = db.Column(BigInteger())
    read_at = db.Column(BigInteger())


