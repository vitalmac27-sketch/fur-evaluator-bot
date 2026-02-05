import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, XCircle, Sparkles, MessageCircle, Send } from "lucide-react";

const WhatsAppIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);

const MaxIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15h-2v-6h2v6zm4 0h-2v-6h2v6zm1-8H8V7h8v2z"/>
  </svg>
);

type Step = 1 | 2 | 3 | "result";

interface FormData {
  age: string;
  size: string;
  hasDefects: string;
}

const FurCoatEvaluator = () => {
  const [step, setStep] = useState<Step>(1);
  const [formData, setFormData] = useState<FormData>({
    age: "",
    size: "",
    hasDefects: "",
  });
  const buttonsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (formData.age || formData.size || formData.hasDefects) {
      setTimeout(() => {
        buttonsRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
      }, 100);
    }
  }, [formData.age, formData.size, formData.hasDefects]);

  const isEligible = () => {
    return (
      formData.age === "0-3" &&
      (formData.size === "48-50" || formData.size === "50-52" || formData.size === "52-54" || formData.size === "54+") &&
      formData.hasDefects === "no"
    );
  };

  const handleNext = () => {
    if (step === 1 && formData.age) {
      setStep(2);
    } else if (step === 2 && formData.size) {
      setStep(3);
    } else if (step === 3 && formData.hasDefects) {
      setStep("result");
    }
  };

  const handleBack = () => {
    if (step === 2) setStep(1);
    else if (step === 3) setStep(2);
    else if (step === "result") setStep(3);
  };

  const handleReset = () => {
    setStep(1);
    setFormData({
      age: "",
      size: "",
      hasDefects: "",
    });
  };

  const handleWhatsApp = () => {
    const message = encodeURIComponent(
      `Здравствуйте! Я хочу продать норковую шубу:\n\nВозраст: ${formData.age === "0-3" ? "от 0 до 3 лет" : formData.age === "4-10" ? "от 4 до 10 лет" : "от 10 и более"}\nРазмер: ${formData.size}\nДефекты: ${formData.hasDefects === "yes" ? "Да" : "Нет"}`
    );
    window.open(`https://wa.me/+79179153858?text=${message}`, "_blank");
  };

  const handleMax = () => {
    window.open("https://max.ru/u/f9LHodD0cOJhOo9RkiGtlbouWLdIia3QK7mTBFMCQ8l2U4EfKpF4ehl9OSs", "_blank");
  };

  const handleTelegram = () => {
    window.open("https://t.me/elmiradarina", "_blank");
  };

  const renderStep = () => {
    if (step === "result") {
      const eligible = isEligible();
      return (
        <Card className="w-full max-w-2xl mx-auto animate-scale-in">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              {eligible ? (
                <div className="relative">
                  <CheckCircle2 className="w-16 h-16 text-primary animate-scale-in" />
                  <Sparkles className="w-6 h-6 text-primary absolute -top-1 -right-1 animate-pulse" />
                </div>
              ) : (
                <XCircle className="w-16 h-16 text-destructive animate-scale-in" />
              )}
            </div>
            <CardTitle className="text-3xl font-bold bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
              {eligible ? "Отлично!" : "К сожалению, ваша шуба не подходит"}
            </CardTitle>
            <CardDescription className="text-lg mt-2">
              {eligible
                ? "Мы готовы сделать вам предложение!"
                : "Мы выкупаем шубы до 3 лет, размеры от 48-50 и без дефектов"}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="bg-muted p-4 rounded-lg space-y-2">
              <p>
                <strong>Возраст шубы:</strong>{" "}
                {formData.age === "0-3" ? "от 0 до 3 лет" : formData.age === "4-10" ? "от 4 до 10 лет" : "от 10 и более"}
              </p>
              <p>
                <strong>Размер:</strong> {formData.size}
              </p>
              <p>
                <strong>Дефекты:</strong> {formData.hasDefects === "yes" ? "Есть" : "Нет"}
              </p>
            </div>
            {eligible ? (
              <div className="space-y-4">
                <div className="text-center">
                  <p className="text-lg font-medium text-foreground mb-1">Выберите удобный способ связи:</p>
                  <p className="text-sm text-muted-foreground">Ответим в течение 15 минут</p>
                </div>
                <div className="flex flex-col gap-3 max-w-sm mx-auto">
                  <Button 
                    onClick={handleMax}
                    className="w-full bg-[#7B5CFA] hover:bg-[#6A4CE8] text-white hover:scale-[1.02] transition-transform h-12 text-base font-medium" 
                    size="lg"
                  >
                    <MaxIcon />
                    Max
                  </Button>
                  <Button 
                    onClick={handleTelegram} 
                    className="w-full bg-[#229ED9] hover:bg-[#1E8BC3] text-white hover:scale-[1.02] transition-transform h-12 text-base font-medium" 
                    size="lg"
                  >
                    <Send className="w-5 h-5" />
                    Telegram
                  </Button>
                </div>
                <div className="flex justify-center gap-3 pt-2">
                  <Button onClick={handleBack} variant="ghost" className="text-muted-foreground hover:text-foreground" size="sm">
                    ← Назад
                  </Button>
                  <Button onClick={handleReset} variant="ghost" className="text-muted-foreground hover:text-foreground" size="sm">
                    Начать заново
                  </Button>
                </div>
              </div>
            ) : (
              <div className="flex flex-col sm:flex-row gap-3">
                <Button onClick={handleBack} className="w-full bg-muted text-foreground hover:bg-muted/80 sm:bg-background sm:border sm:border-input sm:hover:bg-accent sm:hover:text-accent-foreground" size="lg">
                  Назад
                </Button>
                <Button onClick={handleReset} className="w-full bg-muted text-foreground hover:bg-muted/80 sm:bg-background sm:border sm:border-input sm:hover:bg-accent sm:hover:text-accent-foreground" size="lg">
                  Начать заново
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      );
    }

    return (
      <Card className="w-full max-w-2xl mx-auto animate-fade-in">
        <CardHeader>
          <div className="flex justify-between items-center mb-2">
            <CardTitle className="text-3xl font-bold">Оценка норковой шубы</CardTitle>
            <div className="flex items-center gap-2">
              <div className="h-2 w-20 bg-muted rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-primary to-primary-glow transition-all duration-300"
                  style={{ width: `${(step / 3) * 100}%` }}
                />
              </div>
              <span className="text-sm font-medium text-muted-foreground">Шаг {step}/3</span>
            </div>
          </div>
          <CardDescription className="text-lg">
            {step === 1 && "Сколько лет вашей шубе?"}
            {step === 2 && "Какой размер шубы?"}
            {step === 3 && "Есть ли дефекты на шубе?"}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {step === 1 && (
            <RadioGroup value={formData.age} onValueChange={(value) => setFormData({ ...formData, age: value })} className="space-y-3">
              <div className={`flex items-center space-x-3 p-4 rounded-lg border-2 cursor-pointer transition-all animate-slide-in ${formData.age === "0-3" ? "border-primary bg-primary/10" : "border-border hover:border-primary/50"}`}>
                <RadioGroupItem value="0-3" id="age-0-3" />
                <Label htmlFor="age-0-3" className="flex-1 cursor-pointer font-medium">
                  от 0 до 3 лет
                </Label>
              </div>
              <div className={`flex items-center space-x-3 p-4 rounded-lg border-2 cursor-pointer transition-all animate-slide-in ${formData.age === "4-10" ? "border-primary bg-primary/10" : "border-border hover:border-primary/50"}`} style={{ animationDelay: "0.1s" }}>
                <RadioGroupItem value="4-10" id="age-4-10" />
                <Label htmlFor="age-4-10" className="flex-1 cursor-pointer font-medium">
                  от 4 до 10 лет
                </Label>
              </div>
              <div className={`flex items-center space-x-3 p-4 rounded-lg border-2 cursor-pointer transition-all animate-slide-in ${formData.age === "10+" ? "border-primary bg-primary/10" : "border-border hover:border-primary/50"}`} style={{ animationDelay: "0.2s" }}>
                <RadioGroupItem value="10+" id="age-10+" />
                <Label htmlFor="age-10+" className="flex-1 cursor-pointer font-medium">
                  от 10 и более
                </Label>
              </div>
            </RadioGroup>
          )}

          {step === 2 && (
            <RadioGroup value={formData.size} onValueChange={(value) => setFormData({ ...formData, size: value })} className="space-y-3">
              {["38-42", "42-46", "46-48", "48-50", "50-52", "52-54", "54+"].map((size, index) => (
                <div
                  key={size}
                  className={`flex items-center space-x-3 p-4 rounded-lg border-2 cursor-pointer transition-all animate-slide-in ${formData.size === size ? "border-primary bg-primary/10" : "border-border hover:border-primary/50"}`}
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <RadioGroupItem value={size} id={`size-${size}`} />
                  <Label htmlFor={`size-${size}`} className="flex-1 cursor-pointer font-medium">
                    {size === "54+" ? "54 и более" : size}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          )}

          {step === 3 && (
            <RadioGroup
              value={formData.hasDefects}
              onValueChange={(value) => setFormData({ ...formData, hasDefects: value })}
              className="space-y-3"
            >
              <div className={`flex items-center space-x-3 p-4 rounded-lg border-2 cursor-pointer transition-all animate-slide-in ${formData.hasDefects === "no" ? "border-primary bg-primary/10" : "border-border hover:border-primary/50"}`}>
                <RadioGroupItem value="no" id="defects-no" />
                <Label htmlFor="defects-no" className="flex-1 cursor-pointer font-medium">
                  Нет дефектов
                </Label>
              </div>
              <div className={`flex items-center space-x-3 p-4 rounded-lg border-2 cursor-pointer transition-all animate-slide-in ${formData.hasDefects === "yes" ? "border-primary bg-primary/10" : "border-border hover:border-primary/50"}`} style={{ animationDelay: "0.1s" }}>
                <RadioGroupItem value="yes" id="defects-yes" />
                <Label htmlFor="defects-yes" className="flex-1 cursor-pointer font-medium">
                  Есть дефекты (потертости, следы от моли, дырки)
                </Label>
              </div>
            </RadioGroup>
          )}

          <div ref={buttonsRef} className="flex gap-3 pt-4">
            {step !== 1 && (
              <Button onClick={handleBack} variant="outline" className="flex-1" size="lg">
                Назад
              </Button>
            )}
            <Button
              onClick={handleNext}
              disabled={
                (step === 1 && !formData.age) ||
                (step === 2 && !formData.size) ||
                (step === 3 && !formData.hasDefects)
              }
              className="flex-1 gradient-primary disabled:opacity-50 disabled:cursor-not-allowed"
              size="lg"
            >
              {step === 3 ? "Узнать результат" : "Далее"}
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-card py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8 animate-fade-in">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 bg-gradient-to-r from-primary via-primary-glow to-primary bg-clip-text text-transparent">
            продать-шубу.рф
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground font-medium">Быстрая оценка и выкуп норковых шуб</p>
        </div>
        {renderStep()}
      </div>
    </div>
  );
};

export default FurCoatEvaluator;
