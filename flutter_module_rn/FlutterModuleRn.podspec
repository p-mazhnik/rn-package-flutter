# FlutterModuleRn.podspec

require "json"

package = JSON.parse(File.read(File.join(__dir__, "package.json")))

Pod::Spec.new do |s|
  s.name         = "FlutterModuleRn"
  s.version      = package["version"]
  s.summary      = package["description"]
  s.description  = <<-DESC
                  flutter_module_rn
                   DESC
  s.homepage     = package['homepage']
  s.license      = package['license']
  s.authors      = { package['author']['name'] => package['author']['url'] }
  s.platforms    = { :ios => "11.0" }
  s.source       = { :git => package['repository']['url'], :tag => "#{s.version}" }

  s.source_files = "ios-rn/**/*.{h,c,cc,cpp,m,mm,swift}"
  s.requires_arc = true

  s.dependency "React-Core"
  s.dependency "Flutter"
  s.dependency "FlutterModuleFrameworks-Debug"
  s.dependency "FlutterModuleFrameworks-Release"
end

