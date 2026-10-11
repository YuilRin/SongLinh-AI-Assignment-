import { useState } from 'react';
import {
  Archive,
  ArrowUpRight,
  BookOpen,
  Check,
  ChevronDown,
  CircleHelp,
  Clock3,
  Download,
  FileText,
  Flag,
  ImagePlus,
  Layers3,
  Lightbulb,
  Menu,
  MoreHorizontal,
  Plus,
  Printer,
  Save,
  Sparkles,
  Table2,
  Target,
  X,
} from 'lucide-react';

type ActivityTableRow = { cells: string[]; kind: 'heading' | 'normal' };
type ActivityTable = { headers: string[]; rows: ActivityTableRow[] };

type Activity = {
  title: string;
  time: string;
  color: string;
  purpose: string;
  teacher: string;
  student: string;
  product?: string;
  steps?: string[];
  tables?: ActivityTable[];
  image?: string;
};

type Subject = 'Ngữ văn' | 'Toán' | 'Khoa học tự nhiên' | 'Lịch sử và Địa lí' | 'Địa lí';

const demoActivityImage = `data:image/svg+xml;charset=UTF-8,${encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="720" height="300" viewBox="0 0 720 300"><rect width="720" height="300" fill="#dcece3"/><path d="M0 220 C130 140 220 240 340 150 S570 80 720 170 V300 H0Z" fill="#a5c9b5"/><path d="M80 45 L190 90 L280 40 L390 92 L500 48 L620 94" fill="none" stroke="#ed986d" stroke-width="8"/><circle cx="190" cy="90" r="15" fill="#255b53"/><circle cx="390" cy="92" r="15" fill="#255b53"/><circle cx="620" cy="94" r="15" fill="#255b53"/><text x="34" y="42" fill="#255b53" font-family="Arial" font-size="25" font-weight="bold">BAN DO KHAM PHA</text><text x="34" y="270" fill="#255b53" font-family="Arial" font-size="17">Quan sat - doi chieu - rut ra nhan xet</text></svg>')}`;

const subjectDefaults: Record<Subject, { title: string; objective: string }> = {
  'Ngữ văn': { title: 'Những ngôi sao xa xôi', objective: 'Nhận biết được vẻ đẹp tâm hồn và tinh thần dũng cảm của thế hệ trẻ.' },
  'Toán': { title: 'Tìm quy luật từ những con số', objective: 'Nhận diện quy luật, giải thích cách suy luận và vận dụng vào tình huống mới.' },
  'Khoa học tự nhiên': { title: 'Khám phá sự biến đổi của chất', objective: 'Mô tả được dấu hiệu biến đổi và giải thích hiện tượng bằng bằng chứng quan sát.' },
  'Lịch sử và Địa lí': { title: 'Dấu chân trên bản đồ', objective: 'Xác định được không gian, thời gian và mối liên hệ của các sự kiện tiêu biểu.' },
  'Địa lí': { title: 'Vị trí địa lí và phạm vi lãnh thổ', objective: 'Trình bày được vị trí địa lí, giới hạn phạm vi lãnh thổ và ý nghĩa đối với tự nhiên, kinh tế - xã hội.' },
};

const seedActivities: Activity[] = [
  {
    title: 'Khởi động: Chiếc hộp bí mật',
    time: '5 phút',
    color: 'coral',
    purpose: 'Kết nối trải nghiệm của học sinh với chủ đề bài học.',
    teacher: 'Chiếu hình ảnh chiếc hộp và đặt câu hỏi gợi mở: “Điều gì có thể ẩn bên trong?”',
    student: 'Quan sát, dự đoán và chia sẻ một trải nghiệm gần gũi với bạn bên cạnh.',
  },
  {
    title: 'Hình thành kiến thức: Đọc để khám phá',
    time: '20 phút',
    color: 'teal',
    purpose: 'Học sinh nhận diện được các chi tiết quan trọng và thông điệp của văn bản.',
    teacher: 'Giao nhiệm vụ theo nhóm, phát phiếu “Ba ô cửa” và hỗ trợ bằng câu hỏi phân tầng.',
    student: 'Đọc văn bản, đánh dấu chi tiết và hoàn thành phiếu học tập theo vai trò nhóm.',
    tables: [{ headers: ['Chi tiết', 'Suy luận của nhóm'], rows: [{ cells: ['Hình ảnh nhân vật', 'Dũng cảm, giàu tình đồng đội'], kind: 'normal' }, { cells: ['Ngôn ngữ kể chuyện', 'Tự nhiên, trẻ trung, chân thực'], kind: 'normal' }] }],
    image: demoActivityImage,
  },
  {
    title: 'Luyện tập: Bản đồ thông điệp',
    time: '10 phút',
    color: 'gold',
    purpose: 'Củng cố kiến thức bằng một sản phẩm trực quan ngắn gọn.',
    teacher: 'Mời đại diện nhóm trình bày bản đồ, chuẩn hóa từ khóa và nhận xét sản phẩm.',
    student: 'Sắp xếp từ khóa, giải thích mối liên hệ và phản biện nhẹ nhàng sản phẩm bạn.',
  },
  {
    title: 'Vận dụng: Một việc tử tế',
    time: '8 phút',
    color: 'lilac',
    purpose: 'Chuyển hóa bài học thành hành động có thể thực hiện trong đời sống.',
    teacher: 'Gợi ý học sinh viết một cam kết nhỏ, quan sát được trong tuần này.',
    student: 'Viết cam kết cá nhân và chọn một cách chia sẻ để lan tỏa trong lớp.',
  },
];

const sampleLibrary: Record<Subject, Activity[]> = {
  'Ngữ văn': [seedActivities[0], seedActivities[1], seedActivities[2], seedActivities[3], { title: 'Mở rộng: Nhật ký người đọc', time: '7 phút', color: 'blue', purpose: 'Kết nối văn bản với một suy nghĩ cá nhân có căn cứ.', teacher: 'Mời học sinh chọn một câu văn ấn tượng và nêu lí do lựa chọn.', student: 'Viết phản hồi ngắn, trích dẫn chi tiết và chia sẻ với nhóm.', }],
  'Toán': [
    { title: 'Khởi động: Dự đoán nhanh', time: '5 phút', color: 'coral', purpose: 'Kích hoạt vốn hiểu biết và tạo nhu cầu tìm quy luật.', teacher: 'Đưa ra ba tình huống ngắn, yêu cầu học sinh dự đoán kết quả.', student: 'Quan sát, dự đoán và giải thích cách nghĩ với bạn bên cạnh.' },
    { title: 'Khám phá: Trạm nhiệm vụ', time: '20 phút', color: 'teal', purpose: 'Học sinh tự phát hiện kiến thức qua các nhiệm vụ có mức độ tăng dần.', teacher: 'Chuẩn bị bốn trạm bài tập và hỗ trợ nhóm đang gặp khó khăn.', student: 'Luân chuyển qua các trạm, ghi lại cách giải và điều rút ra.' },
    { title: 'Giải thích: Vì sao đúng?', time: '8 phút', color: 'gold', purpose: 'Làm rõ lập luận thay vì chỉ ghi lại đáp án.', teacher: 'Yêu cầu học sinh trình bày hai cách giải và đặt câu hỏi phản biện.', student: 'So sánh cách giải, chỉ ra bước then chốt và sửa lỗi cho nhau.' },
    { title: 'Luyện tập phân hóa', time: '10 phút', color: 'lilac', purpose: 'Củng cố kiến thức theo mức độ phù hợp với từng học sinh.', teacher: 'Giao phiếu ba mức và theo dõi tiến độ của từng nhóm.', student: 'Chọn nhiệm vụ phù hợp, giải thích đáp án và tự đánh giá.', },
    { title: 'Vận dụng: Bài toán quanh ta', time: '7 phút', color: 'blue', purpose: 'Đưa kiến thức vào một tình huống đời sống.', teacher: 'Nêu bài toán thực tế và gợi ý cách kiểm tra tính hợp lí.', student: 'Mô hình hóa tình huống, tính toán và trình bày kết quả.', },
  ],
  'Khoa học tự nhiên': [
    { title: 'Dự đoán trước thí nghiệm', time: '7 phút', color: 'gold', purpose: 'Hình thành câu hỏi khoa học từ một hiện tượng gần gũi.', teacher: 'Cho học sinh quan sát hiện tượng và ghi lại dự đoán lên bảng nhóm.', student: 'Đưa ra giả thuyết, nêu lí do và so sánh với dự đoán của bạn.' },
    { title: 'Trạm quan sát: Bằng chứng nói gì?', time: '18 phút', color: 'teal', purpose: 'Rèn năng lực thu thập và giải thích dữ liệu.', teacher: 'Phát phiếu quan sát, hướng dẫn cách ghi nhận dữ liệu an toàn.', student: 'Quan sát, đo đạc, đối chiếu kết quả và rút ra kết luận.' },
    { title: 'Phân loại hiện tượng', time: '8 phút', color: 'coral', purpose: 'Nhận diện dấu hiệu đặc trưng của các hiện tượng.', teacher: 'Cung cấp thẻ hiện tượng và thống nhất tiêu chí phân loại.', student: 'Phân loại thẻ, giải thích tiêu chí và điều chỉnh khi có bằng chứng mới.' },
    { title: 'Mô hình hóa bằng sơ đồ', time: '10 phút', color: 'lilac', purpose: 'Biểu diễn mối quan hệ giữa các thành phần của quá trình.', teacher: 'Gợi ý các từ khóa bắt buộc và đặt câu hỏi kiểm tra.', student: 'Vẽ sơ đồ, chú thích mũi tên và thuyết minh mô hình.', },
    { title: 'Kết luận từ dữ liệu', time: '7 phút', color: 'blue', purpose: 'Rèn thói quen kết luận dựa trên bằng chứng.', teacher: 'Yêu cầu học sinh viết kết luận theo mẫu “Dữ liệu cho thấy...”.', student: 'Viết kết luận, nêu bằng chứng và đề xuất một câu hỏi tiếp theo.', },
  ],
  'Lịch sử và Địa lí': [
    { title: 'Bản đồ ký ức', time: '8 phút', color: 'lilac', purpose: 'Xác định không gian và mốc thời gian của bài học.', teacher: 'Chiếu bản đồ câm, gợi ý các dấu mốc cần kết nối.', student: 'Định vị địa danh, sắp xếp mốc thời gian và đặt câu hỏi.' },
    { title: 'Phòng trưng bày tư liệu', time: '20 phút', color: 'gold', purpose: 'Đọc tư liệu để hình thành nhận xét có căn cứ.', teacher: 'Cung cấp tư liệu theo nhóm và yêu cầu mỗi nhóm chọn một bằng chứng.', student: 'Phân tích tư liệu, ghi chú bằng chứng và thuyết minh ngắn.' },
    { title: 'Dòng thời gian sống động', time: '8 phút', color: 'coral', purpose: 'Nhìn thấy diễn biến và sự tiếp nối của các sự kiện.', teacher: 'Phát thẻ sự kiện, yêu cầu nhóm sắp xếp và giải thích thứ tự.', student: 'Sắp xếp thẻ, chỉ ra mối quan hệ trước - sau và đặt tên giai đoạn.', },
    { title: 'Đọc không gian địa lí', time: '10 phút', color: 'teal', purpose: 'Khai thác bản đồ để giải thích sự phân bố.', teacher: 'Đặt câu hỏi theo lớp bản đồ và hướng dẫn đọc chú giải.', student: 'Đọc bản đồ, tìm quy luật phân bố và trình bày nhận xét.', },
    { title: 'Góc nhìn nhân vật lịch sử', time: '7 phút', color: 'blue', purpose: 'Hiểu sự kiện từ nhiều góc nhìn và bối cảnh.', teacher: 'Giao vai, cung cấp tư liệu ngắn và nêu tiêu chí trình bày.', student: 'Hóa thân, nêu lựa chọn của nhân vật và bảo vệ quan điểm.', },
  ],
  'Địa lí': [
    { title: 'Khởi động: Đoán vị trí trên bản đồ', time: '5 phút', color: 'coral', purpose: 'Kích hoạt hiểu biết về không gian địa lí Việt Nam.', teacher: 'Chiếu bản đồ câm và đưa ra các gợi ý theo mức độ.', student: 'Xác định vị trí, nêu căn cứ và trao đổi với nhóm.', },
    { title: 'Khám phá: Đọc bản đồ hành chính', time: '15 phút', color: 'teal', purpose: 'Rèn kĩ năng đọc kí hiệu, phương hướng và phạm vi lãnh thổ.', teacher: 'Hướng dẫn đọc chú giải và giao phiếu xác định vị trí.', student: 'Đọc bản đồ, hoàn thành phiếu và giải thích kết quả.', tables: [{ headers: ['Đối tượng', 'Cách xác định', 'Kết quả'], rows: [{ cells: ['Vị trí địa lí', 'Dựa vào kinh tuyến, vĩ tuyến', 'Việt Nam ở Đông Nam Á'], kind: 'normal' }, { cells: ['Phạm vi lãnh thổ', 'Đọc bản đồ và chú giải', 'Đất liền, biển, đảo'], kind: 'normal' }] }], image: demoActivityImage, },
    { title: 'Phân tích: Ý nghĩa vị trí địa lí', time: '10 phút', color: 'gold', purpose: 'Liên hệ vị trí với tự nhiên, kinh tế - xã hội và quốc phòng.', teacher: 'Cung cấp sơ đồ gợi ý, yêu cầu nhóm tìm mối liên hệ.', student: 'Phân tích sơ đồ, chọn dẫn chứng và trình bày nhận xét.', },
    { title: 'Luyện tập: Bản đồ nói gì?', time: '8 phút', color: 'lilac', purpose: 'Củng cố kĩ năng khai thác Atlat và bản đồ chuyên đề.', teacher: 'Đặt câu hỏi nhanh, nhận xét cách dùng bằng chứng của học sinh.', student: 'Tra cứu Atlat, trả lời câu hỏi và tự sửa câu trả lời.', },
    { title: 'Vận dụng: Viết chú thích bản đồ', time: '7 phút', color: 'blue', purpose: 'Chuyển kiến thức thành một sản phẩm bản đồ ngắn gọn.', teacher: 'Giao nhiệm vụ chú thích một bản đồ và nêu tiêu chí sản phẩm.', student: 'Hoàn thiện chú thích, kiểm tra tính chính xác và chia sẻ sản phẩm.', },
  ],
};

const withTeachingDetails = (activities: Activity[]): Activity[] => activities.map((activity, index) => ({
  ...activity,
  product: activity.product ?? `Phiếu học tập hoạt động ${index + 1} và phần trình bày ngắn của nhóm.`,
  steps: activity.steps ?? [
    'Giáo viên giao nhiệm vụ, nêu thời gian và tiêu chí sản phẩm.',
    'Học sinh làm việc cá nhân hoặc theo nhóm, ghi lại bằng chứng.',
    'Đại diện trình bày, các nhóm nhận xét và giáo viên chuẩn hóa kiến thức.',
  ],
}));

const navItems = [
  { label: 'Bàn soạn bài', icon: Layers3 },
  { label: 'Thư viện', icon: Archive },
  { label: 'Hướng dẫn', icon: CircleHelp },
];

function App() {
  const [activeNav, setActiveNav] = useState('Bàn soạn bài');
  const [activities, setActivities] = useState(() => withTeachingDetails(seedActivities));
  const [openActivity, setOpenActivity] = useState(0);
  const [activeStep, setActiveStep] = useState(1);
  const [subject, setSubject] = useState<Subject>('Ngữ văn');
  const [lessonTitle, setLessonTitle] = useState(subjectDefaults['Ngữ văn'].title);
  const [objective, setObjective] = useState(subjectDefaults['Ngữ văn'].objective);
  const [week, setWeek] = useState('1');
  const [period, setPeriod] = useState('Tiết 1, 2');
  const [prepDate, setPrepDate] = useState('2024-09-01');
  const [grade, setGrade] = useState('7');
  const [knowledge, setKnowledge] = useState('Trình bày được nội dung cốt lõi và ý nghĩa của bài học.');
  const [competencies, setCompetencies] = useState('Giao tiếp và hợp tác; tự chủ và tự học; giải quyết vấn đề và sáng tạo.');
  const [qualities, setQualities] = useState('Yêu nước, chăm chỉ, trách nhiệm.');
  const [teacherMaterials, setTeacherMaterials] = useState('Bản đồ, tranh ảnh, máy chiếu, phiếu học tập và bảng nhóm.');
  const [studentMaterials, setStudentMaterials] = useState('Sách giáo khoa, vở ghi, bút viết và Atlat Địa lí Việt Nam.');
  const [saved, setSaved] = useState(false);
  const [toast, setToast] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [finishedTables, setFinishedTables] = useState<Record<string, boolean>>({});

  const formattedPrepDate = prepDate ? new Intl.DateTimeFormat('vi-VN').format(new Date(`${prepDate}T00:00:00`)) : 'Chưa chọn';

  const notify = (message: string) => {
    setToast(message);
    window.setTimeout(() => setToast(''), 2600);
  };

  const generatePlan = () => {
    setIsGenerating(true);
    window.setTimeout(() => {
      setIsGenerating(false);
      setSaved(false);
      notify('Đã làm mới gợi ý hoạt động theo Công văn 7991');
    }, 900);
  };

  const addActivity = () => {
    const nextActivity: Activity = {
      title: 'Hoạt động mới: Cùng thiết kế',
      time: '5 phút',
      color: 'blue',
      purpose: 'Bổ sung một nhịp học tập phù hợp với lớp của thầy cô.',
      teacher: 'Nêu yêu cầu ngắn gọn, chia sẻ tiêu chí và quan sát tiến trình.',
      student: 'Làm việc theo cặp, tạo sản phẩm và trình bày trong một phút.',
    };
    setActivities((current) => [...current, nextActivity]);
    setOpenActivity(activities.length);
    notify('Đã thêm một hoạt động vào kế hoạch');
  };

  const updateActivity = (index: number, field: keyof Activity, value: string) => {
    setActivities((current) => current.map((activity, activityIndex) => activityIndex === index ? { ...activity, [field]: value } : activity));
  };

  const updateActivityStep = (activityIndex: number, stepIndex: number, value: string) => {
    setActivities((current) => current.map((activity, index) => index === activityIndex ? { ...activity, steps: (activity.steps ?? []).map((step, currentStep) => currentStep === stepIndex ? value : step) } : activity));
  };

  const addActivityTable = (index: number) => {
    const newTable: ActivityTable = { headers: ['Tiêu chí', 'Nội dung'], rows: [{ cells: ['Ý chính', 'Học sinh ghi câu trả lời'], kind: 'normal' }] };
    setActivities((current) => current.map((activity, activityIndex) => activityIndex === index ? { ...activity, tables: [...(activity.tables ?? []), newTable] } : activity));
  };

  const updateActivityTableCell = (activityIndex: number, tableIndex: number, rowIndex: number, cellIndex: number, value: string) => {
    setActivities((current) => current.map((activity, index) => {
      if (index !== activityIndex || !activity.tables?.[tableIndex]) return activity;
      const table = activity.tables[tableIndex];
      if (rowIndex === -1) {
        const headers = table.headers.map((header, currentCell) => currentCell === cellIndex ? value : header);
        return { ...activity, tables: activity.tables.map((item, currentTable) => currentTable === tableIndex ? { ...item, headers } : item) };
      }
      const rows = table.rows.map((row, currentRow) => currentRow === rowIndex ? { ...row, cells: row.cells.map((cell, currentCell) => currentCell === cellIndex ? value : cell) } : row);
      return { ...activity, tables: activity.tables.map((item, currentTable) => currentTable === tableIndex ? { ...item, rows } : item) };
    }));
  };

  const addActivityTableRow = (activityIndex: number, tableIndex: number, kind: ActivityTableRow['kind']) => {
    setActivities((current) => current.map((activity, index) => {
      const table = activity.tables?.[tableIndex];
      return index === activityIndex && table ? { ...activity, tables: activity.tables?.map((item, currentTable) => currentTable === tableIndex ? { ...item, rows: [...item.rows, { cells: item.headers.map(() => ''), kind }] } : item) } : activity;
    }));
  };

  const deleteActivityTableRow = (activityIndex: number, tableIndex: number, rowIndex: number) => {
    setActivities((current) => current.map((activity, index) => index === activityIndex && activity.tables?.[tableIndex] ? { ...activity, tables: activity.tables.map((table, currentTable) => currentTable === tableIndex ? { ...table, rows: table.rows.filter((_, currentRow) => currentRow !== rowIndex) } : table) } : activity));
  };

  const addActivityTableColumn = (activityIndex: number, tableIndex: number) => {
    setActivities((current) => current.map((activity, index) => index === activityIndex && activity.tables?.[tableIndex] ? { ...activity, tables: activity.tables.map((table, currentTable) => currentTable === tableIndex ? { headers: [...table.headers, `Cột ${table.headers.length + 1}`], rows: table.rows.map((row) => ({ ...row, cells: [...row.cells, ''] })) } : table) } : activity));
  };

  const deleteActivityTableColumn = (activityIndex: number, tableIndex: number, columnIndex: number) => {
    setActivities((current) => current.map((activity, index) => index === activityIndex && activity.tables?.[tableIndex] ? { ...activity, tables: activity.tables.map((table, currentTable) => currentTable === tableIndex && table.headers.length > 1 ? { headers: table.headers.filter((_, currentColumn) => currentColumn !== columnIndex), rows: table.rows.map((row) => ({ ...row, cells: row.cells.filter((_, currentColumn) => currentColumn !== columnIndex) })) } : table) } : activity));
  };

  const deleteActivityTable = (activityIndex: number, tableIndex: number) => {
    setActivities((current) => current.map((activity, index) => index === activityIndex ? { ...activity, tables: activity.tables?.filter((_, currentTable) => currentTable !== tableIndex) } : activity));
  };

  const finishActivityTable = (activityIndex: number, tableIndex: number) => {
    setFinishedTables((current) => ({ ...current, [`${activityIndex}-${tableIndex}`]: true }));
  };

  const insertActivityImage = (index: number, file: File | undefined) => {
    if (!file) return;
    const reader = new FileReader();
    reader.addEventListener('load', () => updateActivity(index, 'image', String(reader.result)));
    reader.readAsDataURL(file);
  };

  const changeSubject = (nextSubject: Subject) => {
    setSubject(nextSubject);
    setLessonTitle(subjectDefaults[nextSubject].title);
    setObjective(subjectDefaults[nextSubject].objective);
    if (nextSubject === 'Lịch sử và Địa lí' || nextSubject === 'Địa lí') {
      setTeacherMaterials('Bản đồ Việt Nam, Atlat, tư liệu lịch sử, máy chiếu và phiếu học tập.');
      setStudentMaterials('Sách giáo khoa, Atlat, vở ghi, bút viết và bảng nhóm.');
    }
  };

  const loadLibrary = (librarySubject: Subject) => {
    setSubject(librarySubject);
    setLessonTitle(subjectDefaults[librarySubject].title);
    setObjective(subjectDefaults[librarySubject].objective);
    setActivities(withTeachingDetails(sampleLibrary[librarySubject].map((activity) => ({ ...activity }))));
    setActiveNav('Bàn soạn bài');
    setActiveStep(2);
    setOpenActivity(0);
    notify(`Đã nạp ${sampleLibrary[librarySubject].length} hoạt động mẫu môn ${librarySubject}`);
  };

  const savePlan = () => {
    setSaved(true);
    notify('Kế hoạch đã được lưu vào thư viện');
  };

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="brand-mark">
          <div className="brand-symbol">S</div>
          <div>
            <strong>SONG LINH</strong>
            <span>studio giáo dục</span>
          </div>
        </div>
        <div className="sidebar-rule" />
        <div className="workspace-label">KHÔNG GIAN LÀM VIỆC</div>
        <nav className="main-nav" aria-label="Điều hướng chính">
          {navItems.map(({ label, icon: Icon }) => (
            <button
              className={activeNav === label ? 'nav-item active' : 'nav-item'}
              key={label}
              onClick={() => {
                setActiveNav(label);
                if (label === 'Thư viện') setActiveStep(0);
                if (label === 'Hướng dẫn') notify('Hãy bắt đầu từ bước 01, sau đó chuyển sang bước 02 khi thông tin đã đủ');
              }}
            >
              <Icon size={18} strokeWidth={1.8} />
              <span>{label}</span>
              {label === 'Thư viện' && <span className="nav-count">12</span>}
            </button>
          ))}
        </nav>
        <div className="sidebar-bottom">
          <div className="teacher-card">
            <div className="avatar">ML</div>
            <div>
              <strong>Minh Linh</strong>
              <span>Giáo viên Ngữ văn</span>
            </div>
            <MoreHorizontal size={17} />
          </div>
          <div className="version"><span className="status-dot" /> Bản thử nghiệm 1.0</div>
        </div>
      </aside>

      <main className="main-content">
        <header className="topbar">
          <button className="mobile-menu" aria-label="Mở menu"><Menu size={20} /></button>
          <div className="breadcrumbs"><span>Bàn soạn bài</span><span>/</span><strong>{subject} 7 · Tiết 24</strong></div>
          <div className="top-actions">
            <button className="icon-button" aria-label="Trợ giúp" onClick={() => notify('Trợ lý hướng dẫn sẵn sàng hỗ trợ')}><CircleHelp size={19} /></button>
            <button className="avatar small-avatar">ML</button>
          </div>
        </header>

        <div className="page-wrap">
          {activeNav === 'Thư viện' ? <section className="library-view"><div className="eyebrow"><span className="eyebrow-line" /> KHO HOẠT ĐỘNG MẪU</div><h1>Chọn một nhịp dạy<br /><em>để bắt đầu nhanh hơn.</em></h1><p className="intro-copy">Các hoạt động dưới đây có thể nạp vào kế hoạch rồi chỉnh lại theo lớp học của thầy cô.</p><div className="library-grid">{(Object.keys(sampleLibrary) as Subject[]).map((librarySubject) => <article className="library-card" key={librarySubject}><div className="library-card-top"><BookOpen size={20} /><span>{sampleLibrary[librarySubject].length} mẫu</span></div><h2>{librarySubject}</h2><p>{sampleLibrary[librarySubject].map((activity) => activity.title).join(' · ')}</p><button className="primary-button" onClick={() => loadLibrary(librarySubject)}>Dùng bộ mẫu này <ArrowUpRight size={15} /></button></article>)}</div></section> : <>
          <section className="intro-row">
            <div>
              <div className="eyebrow"><span className="eyebrow-line" /> PHIÊN SOẠN THỨ TƯ, 09 THÁNG 10</div>
              <h1>Một kế hoạch rõ ràng,<br /><em>một giờ học có hồn.</em></h1>
              <p className="intro-copy">Song Linh giúp thầy cô chuyển ý tưởng bài học thành kế hoạch mạch lạc, bám chuẩn Công văn 7991 và sẵn sàng để chia sẻ.</p>
            </div>
            <div className="intro-note">
              <Lightbulb size={20} />
              <span><strong>Mẹo nhỏ</strong><br />Mỗi hoạt động nên trả lời được: học sinh sẽ làm gì và tạo ra sản phẩm nào?</span>
            </div>
          </section>

          <section className="progress-strip" aria-label="Tiến độ soạn bài">
            <button className={activeStep === 1 ? 'progress-item current' : activeStep > 1 ? 'progress-item done' : 'progress-item'} onClick={() => setActiveStep(1)}><span className="step-icon">{activeStep > 1 ? <Check size={14} /> : '01'}</span><div><small>{activeStep === 1 ? 'ĐANG LÀM' : 'BƯỚC 01'}</small><strong>Thông tin bài học</strong></div></button>
            <div className={activeStep > 1 ? 'progress-line filled' : 'progress-line'} />
            <button className={activeStep === 2 ? 'progress-item current' : activeStep > 2 ? 'progress-item done' : 'progress-item'} onClick={() => activeStep >= 1 && setActiveStep(2)}><span className="step-icon">{activeStep > 2 ? <Check size={14} /> : '02'}</span><div><small>{activeStep === 2 ? 'ĐANG LÀM' : 'BƯỚC 02'}</small><strong>Thiết kế hoạt động</strong></div></button>
            <div className={activeStep > 2 ? 'progress-line filled' : 'progress-line'} />
            <button className={activeStep === 3 ? 'progress-item current' : 'progress-item'} onClick={() => activeStep >= 2 && setActiveStep(3)}><span className="step-icon">03</span><div><small>{activeStep === 3 ? 'ĐANG LÀM' : 'BƯỚC 03'}</small><strong>Rà soát & xuất bản</strong></div></button>
            <div className="completion"><strong>72%</strong><span>hoàn thiện</span><div className="completion-bar"><i /></div></div>
          </section>

          <div className="content-grid">
            <section className="editor-column">
              <div className="section-heading">
                <div><span className="section-kicker">01 / DỮ LIỆU ĐẦU VÀO</span><h2>Thông tin bài học</h2></div>
                <button className="text-button" onClick={() => notify('Chế độ chỉnh sửa đã sẵn sàng')}><span>Chỉnh sửa</span><ArrowUpRight size={16} /></button>
              </div>
              {activeStep === 1 ? <div className="metadata-panel step-form">
                <label className="meta-field"><span>THỜI GIAN / TUẦN</span><input type="number" min="1" max="52" value={week} onChange={(event) => setWeek(event.target.value)} /></label>
                <label className="meta-field"><span>PHÂN PHỐI CHƯƠNG TRÌNH</span><input value={period} onChange={(event) => setPeriod(event.target.value)} /></label>
                <label className="meta-field"><span>NGÀY SOẠN</span><input type="date" value={prepDate} onChange={(event) => setPrepDate(event.target.value)} /></label>
                <label className="meta-field subject"><span>MÔN HỌC</span><select value={subject} onChange={(event) => changeSubject(event.target.value as Subject)}>{(Object.keys(sampleLibrary) as Subject[]).map((item) => <option key={item}>{item}</option>)}</select></label>
                <label className="meta-field"><span>LỚP</span><input type="number" min="1" max="12" value={grade} onChange={(event) => setGrade(event.target.value)} /></label>
                <div className="meta-field"><span>THỜI LƯỢNG</span><strong>1 tiết · 45 phút</strong></div>
                <label className="meta-field wide"><span>TÊN BÀI HỌC</span><input value={lessonTitle} onChange={(event) => setLessonTitle(event.target.value)} /></label>
                <label className="meta-field wide"><span>YÊU CẦU CẦN ĐẠT</span><textarea value={objective} onChange={(event) => setObjective(event.target.value)} /></label>
                <label className="meta-field wide"><span>1. KIẾN THỨC</span><textarea value={knowledge} onChange={(event) => setKnowledge(event.target.value)} /></label>
                <label className="meta-field wide"><span>2. NĂNG LỰC</span><textarea value={competencies} onChange={(event) => setCompetencies(event.target.value)} /></label>
                <label className="meta-field wide"><span>3. PHẨM CHẤT</span><textarea value={qualities} onChange={(event) => setQualities(event.target.value)} /></label>
                <label className="meta-field wide"><span>THIẾT BỊ, HỌC LIỆU CỦA GIÁO VIÊN</span><textarea value={teacherMaterials} onChange={(event) => setTeacherMaterials(event.target.value)} /></label>
                <label className="meta-field wide"><span>THIẾT BỊ, HỌC LIỆU CỦA HỌC SINH</span><textarea value={studentMaterials} onChange={(event) => setStudentMaterials(event.target.value)} /></label>
                <button className="next-step-button" onClick={() => setActiveStep(2)}>Lưu thông tin & thiết kế hoạt động <ArrowUpRight size={16} /></button>
              </div> : activeStep === 2 ? <>

              <div className="section-heading activities-heading">
                <div><span className="section-kicker">02 / DÒNG CHẢY TIẾT HỌC</span><h2>Các hoạt động</h2></div>
                <button className="add-button" onClick={addActivity}><Plus size={16} /> Thêm hoạt động</button>
              </div>
              <div className="activity-list">
                {activities.map((activity, index) => {
                  const isOpen = openActivity === index;
                  return (
                    <article className={`activity-card ${isOpen ? 'open' : ''}`} key={`${activity.title}-${index}`}>
                      <button className="activity-summary" onClick={() => setOpenActivity(isOpen ? -1 : index)} aria-expanded={isOpen}>
                        <span className={`activity-index ${activity.color}`}>{String(index + 1).padStart(2, '0')}</span>
                        <span className="activity-name"><strong>{activity.title}</strong><small><Clock3 size={13} /> {activity.time}</small></span>
                        <ChevronDown className={isOpen ? 'chevron rotated' : 'chevron'} size={18} />
                      </button>
                      {isOpen && <div className="activity-detail">
                        <label className="activity-edit-field"><small>TÊN HOẠT ĐỘNG</small><input value={activity.title} onChange={(event) => updateActivity(index, 'title', event.target.value)} /></label>
                        <label className="activity-edit-field"><small>MỤC ĐÍCH</small><textarea value={activity.purpose} onChange={(event) => updateActivity(index, 'purpose', event.target.value)} /></label>
                        <div className="detail-columns"><label><small>VIỆC CỦA GIÁO VIÊN</small><textarea value={activity.teacher} onChange={(event) => updateActivity(index, 'teacher', event.target.value)} /></label><label><small>VIỆC CỦA HỌC SINH</small><textarea value={activity.student} onChange={(event) => updateActivity(index, 'student', event.target.value)} /></label></div>
                        <label className="activity-edit-field"><small>SẢN PHẨM HỌC TẬP</small><textarea value={activity.product ?? ''} onChange={(event) => updateActivity(index, 'product', event.target.value)} placeholder="Ví dụ: Phiếu học tập, sơ đồ, câu trả lời..." /></label>
                        <div className="steps-editor"><small>CÁC BƯỚC TỔ CHỨC THỰC HIỆN</small>{(activity.steps ?? []).map((step, stepIndex) => <label key={`${activity.title}-step-${stepIndex}`}><span>{stepIndex + 1}</span><input value={step} onChange={(event) => updateActivityStep(index, stepIndex, event.target.value)} /></label>)}</div>
                        <div className="activity-tools"><button className="tool-button" onClick={() => addActivityTable(index)}><Table2 size={15} /> Thêm bảng</button><label className="tool-button"><ImagePlus size={15} /> {activity.image ? 'Đổi ảnh' : 'Chèn ảnh'}<input type="file" accept="image/*" hidden onChange={(event) => insertActivityImage(index, event.target.files?.[0])} /></label>{activity.image && <button className="tool-button danger-tool" onClick={() => updateActivity(index, 'image', '')}>Xóa ảnh</button>}</div>
                        {(activity.tables ?? []).map((table, tableIndex) => <div className="activity-table-editor" key={`${activity.title}-table-${tableIndex}`}><div className="table-editor-title"><strong>Bảng {tableIndex + 1}</strong><span>{finishedTables[`${index}-${tableIndex}`] ? 'Đã hoàn tất' : 'Đang chỉnh sửa'}</span></div>{finishedTables[`${index}-${tableIndex}`] ? <div className="table-done-row"><span>Bảng đã xong, có thể thêm trường khác hoặc tạo bảng thứ 2.</span><button className="edit-activity" onClick={() => setFinishedTables((current) => ({ ...current, [`${index}-${tableIndex}`]: false }))}>Sửa bảng</button></div> : <><table><thead><tr>{table.headers.map((header, cellIndex) => <th key={`${tableIndex}-${cellIndex}`}><input value={header} onChange={(event) => updateActivityTableCell(index, tableIndex, -1, cellIndex, event.target.value)} /><button className="delete-column" onClick={() => deleteActivityTableColumn(index, tableIndex, cellIndex)} title="Xóa cột">×</button></th>)}</tr></thead><tbody>{table.rows.map((row, rowIndex) => <tr className={row.kind === 'heading' ? 'table-heading-row' : ''} key={`${activity.title}-row-${rowIndex}`}>{row.cells.map((cell, cellIndex) => <td key={`${rowIndex}-${cellIndex}`}><input value={cell} onChange={(event) => updateActivityTableCell(index, tableIndex, rowIndex, cellIndex, event.target.value)} />{cellIndex === row.cells.length - 1 && <button className="delete-row" onClick={() => deleteActivityTableRow(index, tableIndex, rowIndex)} title="Xóa dòng">×</button>}</td>)}</tr>)}</tbody></table><div className="table-actions"><button className="edit-activity" onClick={() => addActivityTableRow(index, tableIndex, 'normal')}>+ Thêm dòng thường</button><button className="edit-activity" onClick={() => addActivityTableRow(index, tableIndex, 'heading')}>+ Thêm dòng tiêu đề phụ</button><button className="edit-activity" onClick={() => addActivityTableColumn(index, tableIndex)}>+ Thêm cột</button><button className="edit-activity table-delete" onClick={() => deleteActivityTable(index, tableIndex)}>Xóa bảng</button><button className="table-done-button" onClick={() => finishActivityTable(index, tableIndex)}>Bảng đã xong <Check size={14} /></button></div></>}</div>)}
                        {activity.image && <img className="activity-image-preview" src={activity.image} alt="Ảnh minh họa hoạt động" />}
                      </div>}
                    </article>
                  );
                })}
              </div>
              <button className="next-step-button" onClick={() => setActiveStep(3)}>Hoàn tất hoạt động & rà soát <ArrowUpRight size={16} /></button>
              </> : <div className="review-panel"><div className="review-icon"><Check size={24} /></div><h3>Kế hoạch đã sẵn sàng để rà soát</h3><p>Kiểm tra lại mục tiêu, thời lượng và sản phẩm học tập trước khi in hoặc lưu vào thư viện.</p><button className="primary-button" onClick={() => window.print()}><Printer size={16} /> In kế hoạch</button></div>}
            </section>

            <aside className="preview-column">
              <div className="preview-head"><div><span className="section-kicker">XEM TRƯỚC</span><h2>Phiếu kế hoạch</h2></div><button className="icon-button" aria-label="Thêm tuỳ chọn" onClick={() => notify('Đã mở thêm tuỳ chọn')}><MoreHorizontal size={19} /></button></div>
              <div className="paper-preview">
                <div className="paper-topline"><span>SONG LINH / 7991</span><span>01</span></div>
                <div className="paper-admin"><strong>Tuần {week || '...'}</strong><strong>{period}</strong><em>Ngày soạn: {formattedPrepDate}</em></div>
                <div className="paper-title"><span className="mini-tag">KẾ HOẠCH BÀI DẠY</span><h3>{lessonTitle}</h3><p>{subject} {grade || '...'} · Chân trời sáng tạo</p></div>
                <div className="paper-rule" />
                <div className="paper-stats"><div><span>MÔN HỌC</span><strong className="subject-stat">{subject}</strong></div><div><span>HOẠT ĐỘNG</span><strong>{activities.length}</strong></div><div><span>TRẠNG THÁI</span><strong className="ready"><i /> Sẵn sàng</strong></div></div>
                <div className="paper-objective"><span className="paper-label">MỤC TIÊU TRỌNG TÂM</span><p>{objective}</p></div>
                <div className="paper-goals"><div><strong>1. Kiến thức</strong><p>{knowledge}</p></div><div><strong>2. Năng lực</strong><p>{competencies}</p></div><div><strong>3. Phẩm chất</strong><p>{qualities}</p></div></div>
                <div className="paper-materials"><div><strong>THIẾT BỊ CỦA GIÁO VIÊN</strong><p>{teacherMaterials}</p></div><div><strong>HỌC LIỆU CỦA HỌC SINH</strong><p>{studentMaterials}</p></div></div>
                <div className="paper-organization"><strong>III. TIẾN TRÌNH DẠY HỌC</strong><table><thead><tr><th>STT</th><th>Lớp</th><th>Sĩ số</th><th>Ghi chú</th></tr></thead><tbody><tr><td>1</td><td>{grade || '...'}</td><td>...</td><td>Ổn định tổ chức</td></tr></tbody></table></div>
                <div className="paper-timeline">{activities.map((activity, index) => <div className="paper-timeline-item" key={`${activity.title}-${index}`}><span className={`tiny-dot ${activity.color}`} /><div><strong>{String(index + 1).padStart(2, '0')} · {activity.title}</strong><small>{activity.time}</small><p>{activity.purpose}</p><p><b>Sản phẩm:</b> {activity.product ?? 'Phiếu học tập và phần trình bày của học sinh.'}</p><em>GV: {activity.teacher}</em><em>HS: {activity.student}</em>{activity.steps?.map((step, stepIndex) => <em key={`${activity.title}-print-step-${stepIndex}`}>Bước {stepIndex + 1}: {step}</em>)}{activity.tables?.map((table, tableIndex) => <table className="paper-activity-table" key={`${activity.title}-print-table-${tableIndex}`}><thead><tr>{table.headers.map((header) => <th key={header}>{header}</th>)}</tr></thead><tbody>{table.rows.map((row, rowIndex) => <tr className={row.kind === 'heading' ? 'table-heading-row' : ''} key={`${activity.title}-print-row-${rowIndex}`}>{row.cells.map((cell, cellIndex) => <td key={`${rowIndex}-${cellIndex}`}>{cell}</td>)}</tr>)}</tbody></table>)}{activity.image && <img className="paper-activity-image" src={activity.image} alt="Ảnh minh họa hoạt động" />}</div></div>)}</div>
                <div className="paper-footer"><span>GV: Minh Linh</span><span>Trang 1 / 2</span></div>
              </div>
              <div className="export-actions"><button className="secondary-button" onClick={() => window.print()}><Printer size={16} /> In kế hoạch</button><button className="primary-button" onClick={savePlan}>{saved ? <Check size={16} /> : <Save size={16} />}{saved ? 'Đã lưu' : 'Lưu bản nháp'}</button></div>
              <button className="download-link" onClick={() => notify('Bản PDF mẫu đã sẵn sàng để tải xuống')}><Download size={15} /> Xuất bản PDF <span>⌘ E</span></button>
            </aside>
          </div>
          </>}
        </div>
        <footer className="page-footer"><span><Sparkles size={14} /> Được thiết kế cho những giờ học đáng nhớ.</span><span>CV 7991 · Song Linh studio</span></footer>
      </main>
      <button className={`generate-fab ${isGenerating ? 'loading' : ''}`} onClick={generatePlan} disabled={isGenerating}><Sparkles size={18} /> {isGenerating ? 'Đang sắp xếp...' : 'Gợi ý bằng AI'}</button>
      {toast && <div className="toast"><Check size={16} /> {toast}<button aria-label="Đóng thông báo" onClick={() => setToast('')}><X size={14} /></button></div>}
    </div>
  );
}

export default App;
