# Auth

    POST /auth/signup - สมัครสมาชิก ✅
    POST /auth/login - เข้าสู่ระบบ ✅
    POST /auth/logout - ออกจากระบบ ✅
    POST /auth/refresh-token - รีเฟรช token
    POST /auth/forgot-password - ลืมรหัสผ่าน
    POST /auth/reset-password - เปลี่ยนรหัสผ่าน

# User

    GET /user/profile - ดูข้อมูลโปรไฟล์ ✅
    PUT /user/profile - แก้ไขโปรไฟล์ ✅
    POST /user/upload-avatar - อัปโหลดรูปโปรไฟล์
    GET /user/favorites - ดูเส้นทางที่ชื่นชอบ ✅
    POST /user/favorites/:trailId - เพิ่มเส้นทางที่ชื่นชอบ ✅
    DELETE /user/favorites/:trailId - ลบเส้นทางที่ชื่นชอบ ✅
    GET /user/diaries - ดูไดอารี่การเดินป่า
    GET /user/reviews - ดูรีวิวที่เขียน

# Admin

    POST /admin/trails - เพิ่มเส้นทางใหม่ ✅
    PUT /admin/trails/:id - แก้ไขเส้นทาง ✅
    DELETE /admin/trails/:id - ลบเส้นทาง ✅
    POST /admin/parks - เพิ่มอุทยานใหม่ ✅
    GET /admin/users - จัดการผู้ใช้ ✅
    GET /admin/guides/pending - อนุมัติไกด์

# Park

    GET /park - ดูรายการอุทยานทั้งหมด ✅
    GET /park/:id - ดูรายละเอียดอุทยาน ✅
    GET /park/province/:province - ค้นหาอุทยานตามจังหวัด ✅
    GET /park/:id/trails - ดูเส้นทางในอุทยาน ✅
    GET /park/:id/equipment - ดูอุปกรณ์ให้เช่าในอุทยาน ✅

# Trail

    GET /trail - ดูรายการเส้นทางทั้งหมด (filter ตาม difficulty, park, etc.) ✅
    GET /trail/:id - ดูรายละเอียดเส้นทาง ✅
    GET /trail/search - ค้นหาเส้นทาง (ตามชื่อ, จังหวัด, ความยาก)
    GET /trail/:id/features - ดูจุดเด่นของเส้นทาง ✅
    GET /trail/:id/wildlife - ดูสัตว์ป่าที่พบได้ ✅
    GET /trail/:id/safety - ดูข้อมูลความปลอดภัย ✅
    GET /trail/:id/reviews - ดูรีวิวเส้นทาง ✅
    GET /trail/:id/photos - ดูรูปภาพเส้นทาง ✅

# Review

    POST /review - เขียนรีวิวเส้นทาง ✅
    PUT /review/:id - แก้ไขรีวิว ✅
    DELETE /review/:id - ลบรีวิว ✅
    GET /review/trail/:trailId - ดูรีวิวของเส้นทาง ✅

# Photo

    POST /photo/upload - อัปโหลดรูปภาพ
    GET /photo/trail/:trailId - ดูรูปภาพของเส้นทาง
    GET /photo/user/:userId - ดูรูปภาพของผู้ใช้
    DELETE /photo/:id - ลบรูปภาพ

# Diary

    GET /diarie - ดูไดอารี่ของตัวเอง ✅
    POST /diarie - สร้างไดอารี่ใหม่ ✅
    GET /diarie/:id - ดูไดอารี่ ✅
    PUT /diarie/:id - แก้ไขไดอารี่ ✅
    DELETE /diarie/:id - ลบไดอารี่ ✅
    GET /diarie/trail/:trailId - ดูไดอารี่ของเส้นทาง ✅

# Guide

    GET /guide - ดูรายการไกด์ ✅
    GET /guide/:id - ดูข้อมูลไกด์ ✅
    POST /guide/apply - สมัครเป็นไกด์ ✅
    PUT /guide/profile - แก้ไขข้อมูลไกด์ ✅
    GET /guide/search - ค้นหาไกด์ (ตามเส้นทาง, ราคา, rating)

# Booking

    GET /bookings - ดูการจองของตัวเอง
    POST /bookings - จองไกด์
    PUT /bookings/:id/status - อัปเดตสถานะการจอง
    DELETE /bookings/:id - ยกเลิกการจอง
    GET /bookings/guide/:guideId - ดูการจองของไกด์

# Equipment

    GET /equipment/park/:parkId - ดูอุปกรณ์ให้เช่าในอุทยาน
    GET /equipment/:id - ดูรายละเอียดอุปกรณ์
    PUT /equipment/:id/availability - อัปเดตจำนวนอุปกรณ์

# Public Endpoint (ไม่ต้องใช้ token/middleware)

    POST /auth/signup
    POST /auth/login
    POST /auth/forgot-password
    POST /auth/reset-password
    GET /park
    GET /park/:id
    GET /park/province/:province
    GET /park/:id/trails
    GET /park/:id/equipment
    GET /trail
    GET /trail/:id
    GET /trail/search
    GET /trail/:id/features
    GET /trail/:id/wildlife
    GET /trail/:id/safety
    GET /trail/:id/reviews
    GET /trail/:id/photos
    GET /guide
    GET /guide/:id
    GET /guide/search
    GET /review/trail/:trailId
    GET /photo/trail/:trailId
    GET /photo/user/:userId
    GET /equipment/park/:parkId
    GET /equipment/:id

# Endpoint ที่ต้อง login (ต้องมี token / AuthCheckMiddleware)

    POST /auth/logout ✅
    POST /auth/refresh-token ✅
    GET /user/profile
    PUT /user/profile
    POST /user/upload-avatar
    GET /user/favorites
    POST /user/favorites/:trailId
    DELETE /user/favorites/:trailId
    GET /user/diaries
    GET /user/reviews
    POST /review
    PUT /review/:id
    DELETE /review/:id
    POST /photo/upload
    DELETE /photo/:id
    GET /diarie
    POST /diarie
    GET /diarie/:id
    PUT /diarie/:id
    DELETE /diarie/:id
    GET /diarie/trail/:trailId
    POST /guide/apply
    PUT /guide/profile
    GET /bookings
    POST /bookings
    PUT /bookings/:id/status
    DELETE /bookings/:id
    GET /bookings/guide/:guideId

# Endpoint ที่ต้องเป็น admin (AuthCheckMiddleware + AdminCheckMiddleware)

    POST /admin/trails
    PUT /admin/trails/:id
    DELETE /admin/trails/:id
    POST /admin/parks
    GET /admin/users
    GET /admin/guides/pending
    PUT /equipment/:id/availability
