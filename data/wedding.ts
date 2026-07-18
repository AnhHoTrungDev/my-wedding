export const wedding = {
  groom: 'Trung Anh',
  bride: 'Phương Uyên',
  groomFull: 'Hồ Trung Anh',
  groomRole: 'Trưởng Nam',
  brideFull: 'Nguyễn Thị Phương Uyên',
  brideRole: 'Út Nữ',
  city: 'Đà Nẵng',
  country: 'Việt Nam',
  photo: '/couple.jpg',

  // Ngày cưới (YYYY, MM-1, DD, HH, mm) — tháng tính từ 0. Giờ tiệc 17:00.
  date: new Date(2026, 7, 3, 17, 0, 0),
  dateShort: '03.08.2026',
  dateSpaced: '03 . 08 . 2026',
  weekday: 'Thứ Hai',
  lunarLabel: '(Nhằm ngày 21 tháng 06 năm Bính Ngọ)',
  lunarShort: '21/06 BÍNH NGỌ',
  receptionTime: '17:00',

  // Tên khách mặc định khi mở link không có ?to=
  guestDefault: 'Quý Khách',

  ceremony: {
    title: 'Hôn lễ được cử hành tại tư gia',
    time: '09 giờ 30'
  },

  reception: {
    venue: 'Trung tâm Hội nghị Tiệc cưới',
    name: 'PHÌ LŨ',
    hall: 'SẢNH PEARL',
    address: 'Lô 1-2-3 Khu công viên Bắc Tượng Đài, đường 2/9, TP. Đà Nẵng',
    mapQuery: 'Trung tâm Hội nghị Tiệc cưới Phì Lũ đường 2/9 Đà Nẵng'
  },

  families: [
    {
      side: 'NHÀ TRAI',
      lines: ['Bà: <strong>LÊ THỊ THANH NHUNG</strong>'],
      address: 'Mai Hắc Đế, P. An Hải, TP. Đà Nẵng'
    },
    {
      side: 'NHÀ GÁI',
      lines: ['Ông: <strong>NGUYỄN TƯ</strong>', 'Bà: <strong>NGUYỄN THỊ XANH</strong>'],
      address: 'Tổ 9, Thôn 5, X. Tiên Phước, TP. Đà Nẵng'
    }
  ],

  // Hộp mừng cưới — 1 mã QR
  gift: {
    qr: '/qr.png',
    name: 'Hồ Trung Anh'
  }
}

// Link "Thêm vào lịch" — 17:00–21:00 giờ VN (+07) = 10:00–14:00 UTC
export const calendarUrl =
  'https://calendar.google.com/calendar/render?action=TEMPLATE' +
  '&text=' + encodeURIComponent('Tiệc cưới Trung Anh ♥ Phương Uyên') +
  '&dates=20260803T100000Z/20260803T140000Z' +
  '&location=' + encodeURIComponent(
    'Trung tâm Hội nghị Tiệc cưới Phì Lũ, Sảnh Pearl, Lô 1-2-3 Khu công viên Bắc Tượng Đài, đường 2/9, TP. Đà Nẵng'
  ) +
  '&details=' + encodeURIComponent(
    'Trân trọng kính mời quý khách đến chung vui cùng gia đình chúng tôi. Vào lúc 17:00, Thứ Hai 03.08.2026 (nhằm ngày 21 tháng 06 năm Bính Ngọ).'
  )

export const mapUrl =
  'https://www.google.com/maps/search/?api=1&query=' +
  encodeURIComponent(wedding.reception.mapQuery)

export const mapEmbed =
  'https://www.google.com/maps?q=' +
  encodeURIComponent(wedding.reception.mapQuery) +
  '&output=embed'
