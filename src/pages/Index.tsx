import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

interface MMPIQuestion {
  id: number;
  question: string;
}

interface TestResult {
  scale: string;
  score: number;
  interpretation: string;
}

const mmpiQuestions: MMPIQuestion[] = [
  { id: 1, question: "Я легко просыпаюсь от шума" },
  { id: 2, question: "Мне нравится читать механические журналы" },
  { id: 3, question: "У меня хороший аппетит" },
  { id: 4, question: "Я просыпаюсь отдохнувшим большинство утр" },
  { id: 5, question: "Я легко засыпаю" },
  { id: 6, question: "Мне нравится читать газеты о преступлениях" },
  { id: 7, question: "Мои руки и ноги обычно достаточно теплые" },
  { id: 8, question: "Моя повседневная жизнь полна интересных событий" },
  { id: 9, question: "Я работаю под огромным напряжением" },
  { id: 10, question: "У меня бывают приступы тошноты и рвоты" }
];

const Index = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<boolean[]>([]);
  const [testStarted, setTestStarted] = useState(false);
  const [testCompleted, setTestCompleted] = useState(false);
  const [results, setResults] = useState<TestResult[]>([]);

  const handleAnswer = (answer: boolean) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = answer;
    setAnswers(newAnswers);

    if (currentQuestion < mmpiQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      completeTest(newAnswers);
    }
  };

  const completeTest = (finalAnswers: boolean[]) => {
    // Простая симуляция обработки результатов MMPI
    const mockResults: TestResult[] = [
      {
        scale: "Ипохондрия",
        score: Math.floor(Math.random() * 30) + 40,
        interpretation: "Нормальный уровень беспокойства о здоровье"
      },
      {
        scale: "Депрессия",
        score: Math.floor(Math.random() * 25) + 35,
        interpretation: "Легкое снижение настроения в пределах нормы"
      },
      {
        scale: "Истерия",
        score: Math.floor(Math.random() * 20) + 45,
        interpretation: "Средний уровень эмоциональной реактивности"
      },
      {
        scale: "Психопатия",
        score: Math.floor(Math.random() * 15) + 50,
        interpretation: "Нормальный уровень социальной адаптации"
      }
    ];
    
    setResults(mockResults);
    setTestCompleted(true);
  };

  const resetTest = () => {
    setCurrentQuestion(0);
    setAnswers([]);
    setTestStarted(false);
    setTestCompleted(false);
    setResults([]);
  };

  const progress = testStarted ? (currentQuestion / mmpiQuestions.length) * 100 : 0;

  return (
    <div className="min-h-screen bg-[#F5F5F7] text-[#000000]">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-white">
        <div className="mx-auto max-w-7xl px-6 py-20 sm:py-32">
          <div className="text-center">
            <h1 className="text-5xl font-bold tracking-tight sm:text-7xl mb-8">
              Психологическое
              <br />
              <span className="text-[#007AFF]">тестирование</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-gray-600">
              Профессиональные инструменты психодиагностики для понимания личности, 
              выявления особенностей характера и определения психологических профилей.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Button 
                onClick={() => setTestStarted(true)}
                className="rounded-full bg-[#007AFF] px-8 py-3 text-white hover:bg-[#0056CC] transition-colors"
                size="lg"
              >
                Пройти MMPI тест
              </Button>
              <Button 
                variant="outline" 
                className="rounded-full border-gray-300 px-8 py-3"
                size="lg"
              >
                Узнать больше
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* MMPI Test Section */}
      {testStarted && !testCompleted && (
        <section className="py-20 px-6">
          <div className="mx-auto max-w-4xl">
            <Card className="border-0 shadow-2xl rounded-2xl">
              <CardHeader className="text-center pb-8">
                <CardTitle className="text-2xl font-bold">MMPI-2 Тест</CardTitle>
                <CardDescription className="text-gray-600">
                  Миннесотский многофазный личностный опросник
                </CardDescription>
                <div className="mt-6">
                  <Progress value={progress} className="h-2" />
                  <p className="text-sm text-gray-500 mt-2">
                    Вопрос {currentQuestion + 1} из {mmpiQuestions.length}
                  </p>
                </div>
              </CardHeader>
              <CardContent className="px-8 pb-8">
                <div className="text-center">
                  <h3 className="text-xl font-medium mb-8">
                    {mmpiQuestions[currentQuestion]?.question}
                  </h3>
                  <div className="flex gap-4 justify-center">
                    <Button 
                      onClick={() => handleAnswer(true)}
                      className="rounded-full bg-[#007AFF] text-white hover:bg-[#0056CC] px-12 py-3"
                      size="lg"
                    >
                      Да
                    </Button>
                    <Button 
                      onClick={() => handleAnswer(false)}
                      variant="outline"
                      className="rounded-full border-gray-300 px-12 py-3"
                      size="lg"
                    >
                      Нет
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      )}

      {/* Test Results */}
      {testCompleted && (
        <section className="py-20 px-6">
          <div className="mx-auto max-w-6xl">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4">Результаты тестирования</h2>
              <p className="text-gray-600">Анализ ваших ответов по основным шкалам MMPI-2</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              {results.map((result, index) => (
                <Card key={index} className="border-0 shadow-lg rounded-2xl">
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      {result.scale}
                      <Badge 
                        variant={result.score > 65 ? "destructive" : result.score > 55 ? "secondary" : "default"}
                        className="rounded-full"
                      >
                        {result.score}T
                      </Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Progress value={(result.score / 100) * 100} className="mb-4" />
                    <p className="text-sm text-gray-600">{result.interpretation}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="text-center">
              <Button 
                onClick={resetTest}
                variant="outline"
                className="rounded-full border-gray-300 px-8 py-3"
              >
                Пройти тест заново
              </Button>
            </div>
          </div>
        </section>
      )}

      {/* About Testing Section */}
      <section className="py-20 px-6 bg-white">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">О психологическом тестировании</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Современные методы психодиагностики помогают лучше понять личность 
              и принимать обоснованные решения в различных сферах жизни.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-[#007AFF] rounded-full flex items-center justify-center mx-auto mb-6">
                <Icon name="Brain" size={32} className="text-white" />
              </div>
              <h3 className="text-xl font-bold mb-4">Научная основа</h3>
              <p className="text-gray-600">
                Все тесты основаны на проверенных научных методиках 
                и многолетних исследованиях в области психологии.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-[#007AFF] rounded-full flex items-center justify-center mx-auto mb-6">
                <Icon name="BarChart3" size={32} className="text-white" />
              </div>
              <h3 className="text-xl font-bold mb-4">Точная диагностика</h3>
              <p className="text-gray-600">
                Комплексный анализ личностных особенностей с детальной 
                интерпретацией результатов по каждой шкале.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-[#007AFF] rounded-full flex items-center justify-center mx-auto mb-6">
                <Icon name="Shield" size={32} className="text-white" />
              </div>
              <h3 className="text-xl font-bold mb-4">Конфиденциальность</h3>
              <p className="text-gray-600">
                Полная анонимность и защита персональных данных 
                в соответствии с этическими стандартами.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Applications Section */}
      <section className="py-20 px-6 bg-[#F5F5F7]">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Области применения</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Психологическое тестирование находит применение во многих сферах 
              современной жизни и профессиональной деятельности.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: "Briefcase", title: "HR и рекрутинг", desc: "Оценка кандидатов" },
              { icon: "GraduationCap", title: "Образование", desc: "Профориентация" },
              { icon: "Heart", title: "Клиническая", desc: "Диагностика состояний" },
              { icon: "Users", title: "Семейная терапия", desc: "Работа с парами" }
            ].map((item, index) => (
              <Card key={index} className="border-0 shadow-lg rounded-2xl hover:shadow-xl transition-shadow">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-[#007AFF] rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon name={item.icon as any} size={24} className="text-white" />
                  </div>
                  <h3 className="font-bold mb-2">{item.title}</h3>
                  <p className="text-sm text-gray-600">{item.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white py-12 px-6">
        <div className="mx-auto max-w-7xl text-center">
          <h3 className="text-2xl font-bold mb-4">Психологическое тестирование</h3>
          <p className="text-gray-600 mb-8">
            Профессиональные инструменты для понимания человеческой психики
          </p>
          <div className="flex justify-center space-x-6">
            <Button variant="ghost" size="sm">О нас</Button>
            <Button variant="ghost" size="sm">Контакты</Button>
            <Button variant="ghost" size="sm">Конфиденциальность</Button>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;