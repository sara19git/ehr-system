
# Digital Record System

This repository contains the backend implementation of a National Digital Record System, designed to securely store and manage patients' medical records. The system ensures efficient data access for healthcare professionals while maintaining high security standards and scalability.

يحتوي هذا المستودع على backend لنظام National Digital Record ، المصمم لتخزين وإدارة السجلات الطبية للمرضى بأمان. يضمن النظام وصولاً فعالاً للبيانات لمقدمي الرعاية الصحية، مع الحفاظ على معايير أمان عالية وقابلية للتوسع.


## 🔹 Features: الميزات

✅ Utilizes MongoDB as the database to store unstructured medical records informations.

✅ Developed using Node.js & Express.js for a backend.

✅ Provides RESTful APIs for seamless integration with healthcare systems.

✅ Supports patient history tracking, including diagnoses, prescriptions, and test results.

✅ Ensures data security & privacy through authentication (JWT) and encryption mechanisms (bcryptjs).

## 🔹 Future Enhancements:

✅ Integration with frontend interfaces (React.js) for doctors, patients, and admins.

## 📌Note: 

 This repository currently includes only the backend part of the system. The full project, including the frontend, will be published soon upon completion.


 
## خطوات الاستخدام

##  المتطلبات الأساسية

تأكدي أولا من تثبيت هذه المتطلبات على حاسوبك:

Node.js 

MongoDB  (أو استخدمي MongoDB Atlas)

Git (لتحميل المشروع من  GitHub)

Postman ( لتجربة مجموعة ال APIs)


## كيفية تجربة المشروع


## 1️⃣ تحميل المشروع من GitHub

بعد فتح VS Code قومي بفتح Terminal ثم استخدمي هذا الكود لتحميل المشروع 

```bash
git clone https://github.com/sara19git/ehr-system.git
cd ehr-system
```

## 2️⃣ تثبيت الحزم الضرورية

المشروع مرفق بمجموعة من الحزم وهي موجودة في الملف package.json، بعد أستخدام هذا الكود سيتم تثبيتها تلقائيا

```bash
  npm install
```

## 3️⃣ إنشاء ملف البيئة .env
بعد تحميل المشروع وفتحه على VS Code أنشئي ملف باسم .env و قومي بكتابة هذا المحتوى فيه 

``` javaScript
PORT=8000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

MONGO_URI قم باستبداله بعنوان URL  الخاص بال databases  خاصتك
JWT_SECRET: أكتب كلمة سرية تتكون من أرقام وحروف ورموز لحماية صلاحيات المستخدمين

## تشغيل السيرفر 
 
 على Terminal  الخاص ب VS Code  أكتبي هذا الكود

```bash
  npm run dev
```

ثم أضيفي 

```bash
  npm start
```

إذا كان كل شيء يعمل بشكل صحيح، يجب أن تري هذه رسالة

```bash
  DataBases is connectd successfully!
  Server is running on PORT 8000
```

## ال APIs الموجودة (Endpoints)

| method    | path     | Description |              
| :-------- | :------- | :-----------|
| `POST` | `http://localhost:8000/api/patient/createPatient` | إنشاء معلومات جديدة لمريض وتخزينها في قاعدة البيانات | 
| `GET` | `http://localhost:8000/api/patient/getAllPatients` | جلب بيانات جميع المرضى المخزنة في قاعدة البيانات | 
| `PUT` | `http://localhost:8000/api/patient/updatePatient/:id/` | تحديث بيانات مريض معين باستخدام ال id  خاصته|
| `DELETE` | `http://localhost:8000/api/patient/deletePatient/:id/` | حذف بيانات مريض معين باستخدام ال id خاصته| 
| `POST` | `http://localhost:8000/api/patient/registerPatient` | تسجيل حساب لمريض   |
| `POST` | `http://localhost:8000/api/patient/loginPatient` | تسجيل دخول |
| `GET` | `http://localhost:8000/api/patient/getPatient` | جلب بيانات مريض واحد فقط من قاعدة البيانات |

## ملاحظة :
لتجربة هذه ال APIs  أستخدم Postman
بالاضافة لهذا ال API  `http://localhost:8000/api/patient/getPatient` فهو يحتاج إلى المصادقة باستخدام Token عند القيام بتسجيل الدخول باستخدام هذا ال API `http://localhost:8000/api/patient/loginPatient` ستحصل على Token  يجب تضمينه في Authorization header: 


## الاختبار باستخدام Swagger UI

قمت بتوثيق الـ APIs باستخدام Swagger UI، ويمكنك الوصول إليه عبر المتصفح عند تشغيل السيرفر:

[http://localhost:8000/api-docs](http://localhost:8000/api-docs)

يمكنك تجربة جميع الـ APIs مباشرة من الواجهة الرسومية لـ Swagger

