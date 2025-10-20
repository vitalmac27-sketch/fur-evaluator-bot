import { useState } from "react";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, XCircle } from "lucide-react";

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
        <Card className="w-full max-w-2xl mx-auto">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              {eligible ? (
                <CheckCircle2 className="w-16 h-16 text-primary" />
              ) : (
                <XCircle className="w-16 h-16 text-destructive" />
              )}
            </div>
            <CardTitle className="text-2xl">
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
                <Button onClick={handleReset} variant="outline" className="w-full" size="lg">
                  Начать заново
                </Button>
                <Button onClick={handleWhatsApp} className="w-full" size="lg">
                  Связаться в WhatsApp
                </Button>
              </div>
            ) : (
              <Button onClick={handleReset} variant="outline" className="w-full" size="lg">
                Начать заново
              </Button>
            )}
          </CardContent>
        </Card>
      );
    }

    return (
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <div className="flex justify-between items-center mb-2">
            <CardTitle className="text-2xl">Оценка норковой шубы</CardTitle>
            <span className="text-sm text-muted-foreground">Шаг {step} из 3</span>
          </div>
          <CardDescription>
            {step === 1 && "Сколько лет вашей шубе?"}
            {step === 2 && "Какой размер шубы?"}
            {step === 3 && "Есть ли дефекты на шубе?"}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {step === 1 && (
            <RadioGroup value={formData.age} onValueChange={(value) => setFormData({ ...formData, age: value })}>
              <div className="flex items-center space-x-3 p-4 rounded-lg border border-border hover:bg-muted/50 transition-colors">
                <RadioGroupItem value="0-3" id="age-0-3" />
                <Label htmlFor="age-0-3" className="flex-1 cursor-pointer">
                  от 0 до 3 лет
                </Label>
              </div>
              <div className="flex items-center space-x-3 p-4 rounded-lg border border-border hover:bg-muted/50 transition-colors">
                <RadioGroupItem value="4-10" id="age-4-10" />
                <Label htmlFor="age-4-10" className="flex-1 cursor-pointer">
                  от 4 до 10 лет
                </Label>
              </div>
              <div className="flex items-center space-x-3 p-4 rounded-lg border border-border hover:bg-muted/50 transition-colors">
                <RadioGroupItem value="10+" id="age-10+" />
                <Label htmlFor="age-10+" className="flex-1 cursor-pointer">
                  от 10 и более
                </Label>
              </div>
            </RadioGroup>
          )}

          {step === 2 && (
            <RadioGroup value={formData.size} onValueChange={(value) => setFormData({ ...formData, size: value })}>
              {["38-42", "42-46", "46-48", "48-50", "50-52", "52-54", "54+"].map((size) => (
                <div
                  key={size}
                  className="flex items-center space-x-3 p-4 rounded-lg border border-border hover:bg-muted/50 transition-colors"
                >
                  <RadioGroupItem value={size} id={`size-${size}`} />
                  <Label htmlFor={`size-${size}`} className="flex-1 cursor-pointer">
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
            >
              <div className="flex items-center space-x-3 p-4 rounded-lg border border-border hover:bg-muted/50 transition-colors">
                <RadioGroupItem value="no" id="defects-no" />
                <Label htmlFor="defects-no" className="flex-1 cursor-pointer">
                  Нет дефектов
                </Label>
              </div>
              <div className="flex items-center space-x-3 p-4 rounded-lg border border-border hover:bg-muted/50 transition-colors">
                <RadioGroupItem value="yes" id="defects-yes" />
                <Label htmlFor="defects-yes" className="flex-1 cursor-pointer">
                  Есть дефекты (потертости, следы от моли, дырки)
                </Label>
              </div>
            </RadioGroup>
          )}

          <div className="flex gap-3 pt-4">
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
              className="flex-1"
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
    <div className="min-h-screen bg-background py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-3">продать-шубу.рф</h1>
          <p className="text-xl text-muted-foreground">Быстрая оценка и выкуп норковых шуб</p>
        </div>
        {renderStep()}
      </div>
    </div>
  );
};

export default FurCoatEvaluator;
