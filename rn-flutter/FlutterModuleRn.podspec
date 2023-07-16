# FlutterModuleRn.podspec

require './ios-rn/Podspecs/common'

Pod::Spec.new do |s|
  setCommonProps(s)
  s.name         = "FlutterModuleRn"
  s.description  = <<-DESC
                  flutter_module_rn
                   DESC
  s.source_files = "ios-rn/**/*.{h,c,cc,cpp,m,mm,swift}"

  s.dependency "React-Core"
  s.dependency "Flutter"
  s.dependency "FlutterModuleFrameworks-Debug"
  s.dependency "FlutterModuleFrameworks-Release"
end

