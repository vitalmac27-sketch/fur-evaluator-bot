import { useState } from "react";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, XCircle, Clock, Ruler, AlertTriangle, CheckCircle, Sparkles } from "lucide-react";

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
                ? "Свяжитесь с нами в WhatsApp для получения оценки."
                : "Мы выкупаем шубы до 3 лет, размеры от 48-50 и без дефектов"}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
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
              <div className="flex flex-col sm:flex-row gap-3">
                <Button onClick={handleReset} variant="outline" className="w-full hover-lift" size="lg">
                  Начать заново
                </Button>
                <Button onClick={handleWhatsApp} className="w-full gradient-primary shadow-glow animate-pulse-glow hover:scale-105 transition-transform" size="lg">
                  Связаться в WhatsApp
                </Button>
              </div>
            ) : (
              <Button onClick={handleReset} variant="outline" className="w-full hover-lift" size="lg">
                Начать заново
              </Button>
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
          <CardDescription className="text-lg flex items-center gap-2">
            {step === 1 && <><Clock className="w-5 h-5 text-primary" /> Сколько лет вашей шубе?</>}
            {step === 2 && <><Ruler className="w-5 h-5 text-primary" /> Какой размер шубы?</>}
            {step === 3 && <><AlertTriangle className="w-5 h-5 text-primary" /> Есть ли дефекты на шубе?</>}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {step === 1 && (
            <RadioGroup value={formData.age} onValueChange={(value) => setFormData({ ...formData, age: value })} className="space-y-3">
              <div className={`flex items-center space-x-3 p-4 rounded-lg border-2 hover-lift cursor-pointer transition-all animate-slide-in ${formData.age === "0-3" ? "border-primary bg-primary/10 shadow-glow" : "border-border hover:border-primary/50"}`}>
                <RadioGroupItem value="0-3" id="age-0-3" />
                <Clock className="w-5 h-5 text-primary" />
                <Label htmlFor="age-0-3" className="flex-1 cursor-pointer font-medium">
                  от 0 до 3 лет
                </Label>
                {formData.age === "0-3" && <CheckCircle className="w-5 h-5 text-primary animate-scale-in" />}
              </div>
              <div className={`flex items-center space-x-3 p-4 rounded-lg border-2 hover-lift cursor-pointer transition-all animate-slide-in ${formData.age === "4-10" ? "border-primary bg-primary/10 shadow-glow" : "border-border hover:border-primary/50"}`} style={{ animationDelay: "0.1s" }}>
                <RadioGroupItem value="4-10" id="age-4-10" />
                <Clock className="w-5 h-5 text-primary" />
                <Label htmlFor="age-4-10" className="flex-1 cursor-pointer font-medium">
                  от 4 до 10 лет
                </Label>
                {formData.age === "4-10" && <CheckCircle className="w-5 h-5 text-primary animate-scale-in" />}
              </div>
              <div className={`flex items-center space-x-3 p-4 rounded-lg border-2 hover-lift cursor-pointer transition-all animate-slide-in ${formData.age === "10+" ? "border-primary bg-primary/10 shadow-glow" : "border-border hover:border-primary/50"}`} style={{ animationDelay: "0.2s" }}>
                <RadioGroupItem value="10+" id="age-10+" />
                <Clock className="w-5 h-5 text-primary" />
                <Label htmlFor="age-10+" className="flex-1 cursor-pointer font-medium">
                  от 10 и более
                </Label>
                {formData.age === "10+" && <CheckCircle className="w-5 h-5 text-primary animate-scale-in" />}
              </div>
            </RadioGroup>
          )}

          {step === 2 && (
            <RadioGroup value={formData.size} onValueChange={(value) => setFormData({ ...formData, size: value })} className="space-y-3">
              {["38-42", "42-46", "46-48", "48-50", "50-52", "52-54", "54+"].map((size, index) => (
                <div
                  key={size}
                  className={`flex items-center space-x-3 p-4 rounded-lg border-2 hover-lift cursor-pointer transition-all animate-slide-in ${formData.size === size ? "border-primary bg-primary/10 shadow-glow" : "border-border hover:border-primary/50"}`}
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <RadioGroupItem value={size} id={`size-${size}`} />
                  <Ruler className="w-5 h-5 text-primary" />
                  <Label htmlFor={`size-${size}`} className="flex-1 cursor-pointer font-medium">
                    {size === "54+" ? "54 и более" : size}
                  </Label>
                  {formData.size === size && <CheckCircle className="w-5 h-5 text-primary animate-scale-in" />}
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
              <div className={`flex items-center space-x-3 p-4 rounded-lg border-2 hover-lift cursor-pointer transition-all animate-slide-in ${formData.hasDefects === "no" ? "border-primary bg-primary/10 shadow-glow" : "border-border hover:border-primary/50"}`}>
                <RadioGroupItem value="no" id="defects-no" />
                <CheckCircle className="w-5 h-5 text-primary" />
                <Label htmlFor="defects-no" className="flex-1 cursor-pointer font-medium">
                  Нет дефектов
                </Label>
                {formData.hasDefects === "no" && <CheckCircle className="w-5 h-5 text-primary animate-scale-in" />}
              </div>
              <div className={`flex items-center space-x-3 p-4 rounded-lg border-2 hover-lift cursor-pointer transition-all animate-slide-in ${formData.hasDefects === "yes" ? "border-primary bg-primary/10 shadow-glow" : "border-border hover:border-primary/50"}`} style={{ animationDelay: "0.1s" }}>
                <RadioGroupItem value="yes" id="defects-yes" />
                <AlertTriangle className="w-5 h-5 text-destructive" />
                <Label htmlFor="defects-yes" className="flex-1 cursor-pointer font-medium">
                  Есть дефекты (потертости, следы от моли, дырки)
                </Label>
                {formData.hasDefects === "yes" && <CheckCircle className="w-5 h-5 text-primary animate-scale-in" />}
              </div>
            </RadioGroup>
          )}

          <div className="flex gap-3 pt-4">
            {step !== 1 && (
              <Button onClick={handleBack} variant="outline" className="flex-1 hover-lift" size="lg">
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
              className="flex-1 gradient-primary shadow-glow disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 transition-transform"
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
          <h1 className="text-5xl font-bold mb-3 bg-gradient-to-r from-primary via-primary-glow to-primary bg-clip-text text-transparent">
            продать-шубу.рф
          </h1>
          <p className="text-xl text-muted-foreground font-medium">Быстрая оценка и выкуп норковых шуб</p>
        </div>
        {renderStep()}
      </div>
    </div>
  );
};

export default FurCoatEvaluator;
