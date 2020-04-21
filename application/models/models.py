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

class Permission(CommonModel):
    __tablename__ = 'permission'
    id = db.Column(UUID(as_uuid=True), primary_key=True)
    role_id = db.Column(UUID(as_uuid=True), ForeignKey('role.id'), nullable=False)
    subject = db.Column(String,index=True)
    permission = db.Column(String)
    value = db.Column(Boolean, default=False)
    __table_args__ = (UniqueConstraint('role_id', 'subject', 'permission', name='uq_permission_role_subject_permission'),)

class Role(CommonModel):
    __tablename__ = 'role'
    id = db.Column(UUID(as_uuid=True), primary_key=True, default=default_uuid)
    code = db.Column(db.String(80), unique=True)
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
    rank = db.Column(Integer())
    department_id = db.Column(UUID(as_uuid=True),db.ForeignKey('department.id'), nullable=True)
    department = db.relationship('Department', viewonly=True)
    room_id = db.Column(UUID(as_uuid=True),db.ForeignKey('room.id'), nullable=True)
    room = db.relationship('Room', viewonly=True)
    
    def has_role(self, role):
        if isinstance(role, str):
            return role in (role.code for role in self.roles)
        else:
            return role in self.roles


class OrganizationUser(CommonModel):
    __tablename__ = 'organizationuser'
    id = db.Column(UUID(as_uuid=True), primary_key=True, default=default_uuid)
    name = db.Column(db.String(255))
    email = db.Column(db.String(255))
    Website = db.Column(db.String(255))
    Fax = db.Column(db.String(255))
    phone_number = db.Column(db.String(63))
    address = db.Column(db.String(255))
    province_id = db.Column(UUID(as_uuid=True), ForeignKey('province.id'))
    province = relationship('Province', viewonly=True)
    district_id = db.Column(UUID(as_uuid=True), ForeignKey('district.id'))
    district = relationship('District', viewonly=True)
    wards_id = db.Column(UUID(as_uuid=True), ForeignKey('wards.id'))
    wards = relationship('Wards', viewonly=True)
    ceo = db.Column(db.String)
class EthnicGroup(CommonModel):
    __tablename__ = 'ethnicgroup'
    id = db.Column(UUID(as_uuid=True), primary_key=True, default=default_uuid)
    code = db.Column(String(255), index=True)
    name = db.Column(String(255))
    
class Nation(CommonModel):
    __tablename__ = 'nation'
    id = db.Column(UUID(as_uuid=True), primary_key=True, default=default_uuid)
    code = db.Column(String(255), index=True)
    name = db.Column(String(255))

class Province(CommonModel):
    __tablename__ = 'province'
    id = db.Column(UUID(as_uuid=True), primary_key=True, default=default_uuid)
    code = db.Column(String(255),unique=True, index=True)
    name = db.Column(String(255))
    nation_id = db.Column(UUID(as_uuid=True), ForeignKey('nation.id'))
    nation = relationship('Nation', viewonly=True)

class District(CommonModel):
    __tablename__ = 'district'
    id = db.Column(UUID(as_uuid=True), primary_key=True, default=default_uuid)
    code = db.Column(String(255),unique=True, index=True)
    name = db.Column(String(255))
    province_id = db.Column(UUID(as_uuid=True), ForeignKey('province.id'))
    province = relationship('Province', viewonly=True)
    
class Wards(CommonModel):
    __tablename__ = 'wards'
    id = db.Column(UUID(as_uuid=True), primary_key=True, default=default_uuid)
    code = db.Column(String(255),unique=True, index=True)
    name = db.Column(String(255))
    district_id = db.Column(UUID(as_uuid=True), ForeignKey('district.id'))
    district = relationship('District', viewonly=True)

medicalequipment_preparationtools = db.Table('medicalequipment_preparationtools',
    db.Column('medicalequipment_id', UUID(as_uuid=True), db.ForeignKey('medicalequipment.id', ondelete='cascade'), primary_key=True),
    db.Column('preparationtools_id', UUID(as_uuid=True), db.ForeignKey('preparationtools.id', onupdate='cascade'), primary_key=True))

    
class MedicalEquipment(CommonModel):
    __tablename__ = 'medicalequipment'
    id = db.Column(UUID(as_uuid=True), primary_key=True, default=default_uuid)
    name = db.Column(String())
    classify = db.Column(String(255))
    implementing_organization_classification = db.Column(String(255))
    circulation_number = db.Column(String(255))
    organization_requesting_classification = db.Column(String(255))
    status = db.Column(String(255))
    restricted_list = db.Column(String(255),default='active')
    classification_table = db.Column(String(255))
    public_classification = db.Column(String(255))
    types_of_equipment = db.Column(String(255))
    preparationtools = db.relationship('PreparationTools', secondary=medicalequipment_preparationtools, cascade="save-update")
    list_of_equipment_details = db.relationship('EquipmentDetails', cascade="all, delete-orphan")
    List_of_equipment_inspection_procedures = db.relationship('EquipmentInspectionProcedures', cascade="all, delete-orphan")

class PreparationTools(CommonModel):
    __tablename__ = 'preparationtools'
    id = db.Column(UUID(as_uuid=True), primary_key=True, default=default_uuid)
    name = db.Column(String(255))
    code = db.Column(String(255))
    picture = db.Column(String(255))
    function_preparationtools = db.Column(String())


class EquipmentDetails(CommonModel):
    __tablename__ = 'equipmentdetails'
    id = db.Column(UUID(as_uuid=True), primary_key=True, default=default_uuid)
    name = db.Column(String(255))
    model_serial_number = db.Column(String(255))
    management_code = db.Column(String(255))
    made_in = db.Column(String(255))
    restricted_list = db.Column(String(255),default='no')
    time_of_purchase = db.Column(BigInteger())
    supplier_id = db.Column(UUID(as_uuid=True),db.ForeignKey('organizationuser.id'), nullable=True)
    supplier = db.relationship('OrganizationUser', viewonly=True)
    nation_id = db.Column(UUID(as_uuid=True),db.ForeignKey('nation.id'), nullable=True)
    nation = db.relationship('Nation', viewonly=True)
    manufacturer_id = db.Column(UUID(as_uuid=True),db.ForeignKey('manufacturer.id'), nullable=True)
    manufacturer = db.relationship('Manufacturer', viewonly=True)
    warranty_starttime = db.Column(BigInteger())
    warranty_endtime = db.Column(BigInteger())
    Warranty_expired = db.Column(String(255))
    department_id = db.Column(UUID(as_uuid=True),db.ForeignKey('department.id'), nullable=True)
    department = db.relationship('Department', viewonly=True)
    room_id = db.Column(UUID(as_uuid=True),db.ForeignKey('room.id'), nullable=True)
    room = db.relationship('Room', viewonly=True)
    specifications = db.Column(String())
    accessories = db.Column(String())
    device_status_when_making_a_purchase = db.Column(String(255))
    maintenance_requirements = db.Column(String())
    content_for_maintenance = db.Column(String())
    note = db.Column(String())
    date_of_entering_device = db.Column(BigInteger())
    status = db.Column(String(255))
    types_of_equipment = db.Column(String(255))
    medicalequipment_id = db.Column(UUID(as_uuid=True), ForeignKey('medicalequipment.id'), nullable=True)
    List_of_requests_for_repair = db.relationship('RepairRequestForm', cascade="all, delete-orphan")
    list_of_checklists_for_equipment = db.relationship('EquipmentInspectionForm', cascade="all, delete-orphan")
    List_of_device_status_verification_sheets = db.relationship('DeviceStatusVerificationForm', cascade="all, delete-orphan")
    list_of_certificates = db.relationship('CertificateForm ', cascade="all, delete-orphan")

class EquipmentInspectionProcedures(CommonModel):
    __tablename__ = 'equipmentinspectionprocedures'
    id = db.Column(UUID(as_uuid=True), primary_key=True, default=default_uuid)
    step = db.Column(Integer()) 
    content = db.Column(String())
    picture = db.Column(String(255)) 
    medicalequipment_id = db.Column(UUID(as_uuid=True), ForeignKey('medicalequipment.id'), nullable=True)
    
class Manufacturer(CommonModel):
    __tablename__ = 'manufacturer'
    id = db.Column(UUID(as_uuid=True), primary_key=True, default=default_uuid)
    code = db.Column(String(255), index=True)
    name = db.Column(String(255))
    information = db.Column(String(255))


class Department(CommonModel):
    __tablename__ = 'department'
    id = db.Column(UUID(as_uuid=True), primary_key=True, default=default_uuid)
    code = db.Column(String(255))
    name = db.Column(String(255))
    information = db.Column(String(255))
    phongfield = db.relationship('Room', cascade="all, delete-orphan")

class Room(CommonModel):
    __tablename__ = 'room'
    id = db.Column(UUID(as_uuid=True), primary_key=True, default=default_uuid)
    code = db.Column(String(255))
    name = db.Column(String(255))
    information = db.Column(String(255))
    department_id = db.Column(UUID(as_uuid=True),db.ForeignKey('department.id'), nullable=True)
    department = db.relationship('Department', viewonly=True)


class Notification(CommonModel):
    __tablename__ = 'notification'
    id = db.Column(UUID(as_uuid=True), primary_key=True, default=default_uuid)
    name = db.Column(String(255))
    model_serial_number = db.Column(String(255))
    notification_type_id = db.Column(String(255))
    notification_type = db.Column(String(255))
    notification_type_code = db.Column(String(255))
    status = db.Column(String(255))
    notification_time = db.Column(BigInteger())

class RepairRequestForm(CommonModel):
    __tablename__ = 'repairrequestform'
    id = db.Column(UUID(as_uuid=True), primary_key=True, default=default_uuid)
    name = db.Column(String(255))
    model_serial_number = db.Column(String(255))
    management_code = db.Column(String(255))
    user = db.Column(String(255))
    organization_of_use = db.Column(String(255))
    describe_the_problem = db.Column(String())
    time_of_problem = db.Column(BigInteger())
    user_confirmed = db.Column(String(255))
    organization_confirmed = db.Column(String(255))
    preliminary_assessment = db.Column(String())
    evaluation_time = db.Column(BigInteger())
    repair_person_confirmed = db.Column(String(255))
    opinion_of_leader = db.Column(String(255))
    result = db.Column(String())
    Time_to_return_results = db.Column(BigInteger())
    User_confirms_the_result = db.Column(String(255))
    equipmentdetails_id = db.Column(UUID(as_uuid=True), ForeignKey('equipmentdetails.id'), nullable=True)
    check = db.Column(String(10))
    status = db.Column(String(15))
    confirm = db.Column(String(20),default='not_approved')


class DeviceStatusVerificationForm(CommonModel):
    __tablename__ = 'devicestatusverificationform'
    id = db.Column(UUID(as_uuid=True), primary_key=True, default=default_uuid)
    name = db.Column(String(255))
    at = db.Column(String(255))
    model_serial_number = db.Column(String(255))
    management_code = db.Column(String(255))
    home = db.Column(String(255))
    user = db.Column(String(255))
    organization = db.Column(String(255))
    conclusion_of_equipment_issues = db.Column(String())
    directions_to_overcome = db.Column(String())
    date = db.Column(BigInteger())
    cycle = db.Column(String(20))
    check = db.Column(String(10))
    equipmentdetails_id = db.Column(UUID(as_uuid=True), ForeignKey('equipmentdetails.id'), nullable=True)

class EquipmentInspectionForm(CommonModel):
    __tablename__ = 'equipmentinspectionform'
    id = db.Column(UUID(as_uuid=True), primary_key=True, default=default_uuid)
    date = db.Column(BigInteger())
    status = db.Column(String(255))
    describe = db.Column(String(255))
    checker_id = db.Column(String(255))
    checker = db.Column(String(255))
    department_id = db.Column(UUID(as_uuid=True),db.ForeignKey('department.id'), nullable=True)
    department = db.relationship('Department', viewonly=True)
    room_id = db.Column(UUID(as_uuid=True),db.ForeignKey('room.id'), nullable=True)
    room = db.relationship('Room', viewonly=True)
    name = db.Column(String(255))
    model_serial_number = db.Column(String(255))
    management_code = db.Column(String(255))
    check = db.Column(String(10))
    confirm = db.Column(String(20),default='not_approved')
    attachment = db.Column(String(255))
    equipmentdetails_id = db.Column(UUID(as_uuid=True), ForeignKey('equipmentdetails.id'), nullable=True)
    list_of_steps = db.relationship('Step', cascade="all, delete-orphan")
    
class Step(CommonModel):
    __tablename__ = 'step'
    id = db.Column(UUID(as_uuid=True), primary_key=True, default=default_uuid)
    note = db.Column(String(255))
    step = db.Column(Integer()) 
    picture = db.Column(String()) 
    time = db.Column(String(255)) 
    status = db.Column(String(255)) 
    equipmentinspectionform_id = db.Column(UUID(as_uuid=True), ForeignKey('equipmentinspectionform.id'), nullable=True)


class CertificateForm (CommonModel):
    __tablename__ = 'certificateform'
    id = db.Column(UUID(as_uuid=True), primary_key=True, default=default_uuid)
    code = db.Column(String(255), index=True)
    organization = db.Column(String(255))
    date_of_certification = db.Column(BigInteger())
    expiration_date = db.Column(BigInteger())
    attachment_image = db.Column(String())
    status = db.Column(String(255),default='active')
    name = db.Column(String(255))
    model_serial_number = db.Column(String(255))
    management_code = db.Column(String(255))
    check = db.Column(String(10))
    equipmentdetails_id = db.Column(UUID(as_uuid=True), ForeignKey('equipmentdetails.id'), nullable=True)









